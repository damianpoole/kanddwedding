import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const guestDataUrl = new URL('./src/data/guests.json', import.meta.url);
const data = JSON.parse(readFileSync(guestDataUrl, 'utf8'));
const output = data.map((guest) => ({
  ...guest,
  id: createHash('md5').update(guest.family).digest('hex'),
}));

writeFileSync(guestDataUrl, JSON.stringify(output, null, 2));
