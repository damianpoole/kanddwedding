import assert from 'node:assert/strict';
import test from 'node:test';
import { createRsvpValue, findGuest } from '../src/scripts/guest-rsvp.js';

const guests = [
  { id: 'day-token', type: 'wedding', guests: [{ name: 'Day Guest' }] },
  { id: 'night-token', type: 'reception', guests: [{ name: 'Night Guest' }] },
];

test('guest lookup reads only the exact g query parameter', () => {
  assert.equal(findGuest('?g=night-token&other=value', guests), guests[1]);
  assert.equal(findGuest('?other=value', guests), undefined);
  assert.equal(findGuest('?g=unknown', guests), undefined);
  assert.equal(findGuest('?g=day-token%20', guests), undefined);
});

test('RSVP value preserves the Netlify JSON contract', () => {
  assert.deepEqual(
    JSON.parse(
      createRsvpValue(
        [
          { name: 'First Guest', attending: true },
          { name: 'Second Guest', attending: false },
        ],
        'Vegetarian meal',
      ),
    ),
    {
      guests: { 'First Guest': true, 'Second Guest': false },
      dietary: 'Vegetarian meal',
    },
  );
});
