import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8');

test('static build contains the preserved routes and RSVP contract', async () => {
  const [home, success, notFound] = await Promise.all([
    read('index.html'),
    read('success/index.html'),
    read('404.html'),
  ]);
  assert.match(home, /<form[^>]+name="rsvp"[^>]+action="\/success"[^>]+method="post"[^>]+data-netlify="true"/);
  assert.match(home, /name="values"/);
  assert.match(home, /name="form-name" value="rsvp"/);
  assert.match(home, /manifest\.webmanifest/);
  assert.match(home, /Kirsty and Damian/);
  assert.match(success, /Successfully submitted the form/);
  assert.match(notFound, /NOT FOUND/);
});

test('generated service worker precaches routes and built assets', async () => {
  const worker = await read('sw.js');
  assert.match(worker, /"\/"/);
  assert.match(worker, /"\/success\/"/);
  assert.match(worker, /"\/404\.html"/);
  assert.match(worker, /"\/_astro\//);
  assert.match(worker, /caches\.open/);
  assert.match(worker, /caches\.match\(event\.request, \{ ignoreVary: true \}\)/);
});
