import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = new URL('../dist/', import.meta.url);

async function files(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    if (entry.name === 'sw.js') continue;
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) results.push(...(await files(new URL(`${relative}/`, outputDirectory), relative)));
    else results.push(relative);
  }
  return results;
}

function publicUrl(file) {
  if (file === 'index.html') return '/';
  if (file.endsWith('/index.html')) return `/${file.slice(0, -'index.html'.length)}`;
  return `/${file}`;
}

const precache = (await files(outputDirectory)).map(publicUrl).sort();
const source = `const CACHE = 'wedding-site-v1';
const PRECACHE = ${JSON.stringify(precache)};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request, { ignoreVary: true }).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => event.request.mode === 'navigate' ? caches.match('/') : Response.error())));
});
`;
await writeFile(new URL('sw.js', outputDirectory), source);
console.log(`Generated service worker with ${precache.length} same-origin resources.`);
