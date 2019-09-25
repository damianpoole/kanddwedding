const { createHash } = require('crypto');
const { writeFileSync } = require('fs');

const data = require('./src/data/guests.json');

const output = data.map(guest => {
  const hash = createHash('md5')
    .update(guest.family)
    .digest('hex');
  return {
    ...guest,
    id: hash,
  };
});

writeFileSync('./src/data/guests.json', JSON.stringify(output, null, 2));
