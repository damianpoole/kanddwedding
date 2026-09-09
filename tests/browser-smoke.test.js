import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const baseURL = 'http://127.0.0.1:4321';
const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4321'], {
  stdio: ['ignore', 'pipe', 'pipe'],
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Astro preview server did not start');
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({ serviceWorkers: 'allow' });
  await context.route(/^https?:\/\/(?!127\.0\.0\.1:4321)/, (route) => route.abort());
  const page = await context.newPage();

  await page.goto(baseURL);
  assert.equal(await page.locator('[data-day-plan]').isHidden(), true);
  assert.equal(await page.locator('[data-rsvp]').isHidden(), true);
  assert.match(await page.title(), /^Home \| Kirsty and Damian/);

  const guestData = JSON.parse(await readFile(new URL('../src/data/guests.json', import.meta.url), 'utf8'));
  const guest = guestData.find((entry) => entry.guests.length > 0 && entry.guests.every(({ name }) => name !== ''));
  assert.ok(guest, 'test fixture requires one invitation without an unnamed plus-one');

  await page.goto(`${baseURL}/?g=${encodeURIComponent(guest.id)}`);
  assert.equal(await page.locator('[data-day-plan]').isVisible(), true);
  assert.equal(await page.locator('[data-rsvp]').isVisible(), true);
  assert.equal(await page.locator('[data-rsvp-link]').isVisible(), true);

  const radios = page.locator('[data-attendees] input[type="radio"][value="Yes"]');
  assert.equal(await radios.count(), guest.guests.length);
  for (let index = 0; index < guest.guests.length; index += 1) await radios.nth(index).locator('..').click();
  await page.locator('#dietary').fill('Browser smoke test');
  assert.equal(await page.locator('form[name="rsvp"] button').isEnabled(), true);

  let submittedBody;
  await page.route('**/success', async (route) => {
    if (route.request().method() === 'POST') submittedBody = route.request().postData();
    await route.fulfill({ status: 200, contentType: 'text/html', body: '<h1>Intercepted test submission</h1>' });
  });
  await Promise.all([
    page.waitForResponse((response) => response.url().endsWith('/success')),
    page.locator('form[name="rsvp"] button').click(),
  ]);
  assert.ok(submittedBody, 'RSVP was submitted as a POST');
  const posted = new URLSearchParams(submittedBody);
  assert.equal(posted.get('form-name'), 'rsvp');
  const values = JSON.parse(posted.get('values'));
  assert.deepEqual(values.guests, Object.fromEntries(guest.guests.map(({ name }) => [name, true])));
  assert.equal(values.dietary, 'Browser smoke test');

  const offlinePage = await context.newPage();
  await offlinePage.goto(`${baseURL}/?g=${encodeURIComponent(guest.id)}`);
  await offlinePage.evaluate(() => navigator.serviceWorker.ready);
  assert.equal(await offlinePage.locator('[data-rsvp]').isVisible(), true);

  // Disable Chromium's HTTP cache so the reload proves the service worker's
  // precache can serve the Vary: Origin module response while offline.
  const devtools = await context.newCDPSession(offlinePage);
  await devtools.send('Network.enable');
  await devtools.send('Network.setCacheDisabled', { cacheDisabled: true });
  await context.setOffline(true);
  await offlinePage.reload();
  assert.match(await offlinePage.title(), /^Home \| Kirsty and Damian/);
  assert.equal(await offlinePage.locator('img').first().isVisible(), true);
  assert.equal(await offlinePage.locator('[data-day-plan]').isVisible(), true);
  assert.equal(await offlinePage.locator('[data-rsvp]').isVisible(), true);
  assert.equal(await offlinePage.locator('[data-rsvp-link]').isVisible(), true);
  assert.equal(await offlinePage.locator('[data-attendees] input[type="radio"][value="Yes"]').count(), guest.guests.length);
  console.log('Browser smoke passed: routes, guest UI, intercepted RSVP POST, and personalized offline reload.');
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
