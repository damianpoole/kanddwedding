import { createHash } from 'crypto';
import { writeFileSync } from 'fs';

import { map } from './src/data/guests.json';

const output = map(guest => {
  const hash = createHash('md5')
    .update(guest.family)
    .digest('hex');
  return {
    ...guest,
    id: hash,
  };
});

writeFileSync('./src/data/guests.json', JSON.stringify(output, null, 2));
