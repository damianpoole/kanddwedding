export function findGuest(search, guests) {
  const id = new URLSearchParams(search).get('g');
  return id === null ? undefined : guests.find((guest) => guest.id === id);
}

export function createRsvpValue(attendees, dietary) {
  return JSON.stringify({
    guests: Object.fromEntries(
      attendees.map(({ name, attending }) => [name, attending]),
    ),
    dietary,
  });
}

export function initialiseGuestRsvp(document, search, guests) {
  const guest = findGuest(search, guests);
  if (!guest) return undefined;

  document.querySelector('[data-rsvp-link]').hidden = false;
  const dayPlan = document.querySelector('[data-day-plan]');
  dayPlan.hidden = false;
  dayPlan.querySelector('[data-all-day]').hidden = guest.type !== 'wedding';
  dayPlan.querySelector('[data-evening]').hidden = guest.type === 'wedding';

  const section = document.querySelector('[data-rsvp]');
  const attendeesElement = section.querySelector('[data-attendees]');
  const form = section.querySelector('form');
  const values = form.elements.namedItem('values');
  const dietary = section.querySelector('#dietary');
  const submit = form.querySelector('button[type="submit"]');
  const attendees = guest.guests.map(({ name }) => ({ name, attending: null }));

  function update() {
    const complete = attendees.every(
      ({ name, attending }) => name.trim() !== '' && attending !== null,
    );
    submit.disabled = !complete;
    values.value = createRsvpValue(attendees, dietary.value);
  }

  attendees.forEach((attendee, index) => {
    const row = document.createElement('div');
    row.className = 'attending';
    const line = document.createElement('p');
    const nameContainer = document.createElement('span');

    if (attendee.name === '') {
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.placeholder = "Guest's name";
      nameInput.setAttribute('aria-label', "Guest's name");
      nameInput.required = true;
      nameInput.addEventListener('input', () => {
        attendee.name = nameInput.value;
        update();
      });
      nameContainer.append(nameInput);
    } else {
      nameContainer.textContent = `${attendee.name}:`;
    }
    line.append(nameContainer);

    for (const [labelText, value] of [
      ['Coming', true],
      ['Not Coming', false],
    ]) {
      const label = document.createElement('label');
      label.className = 'attendance-option';
      label.textContent = labelText;
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `guest-${index}-attending`;
      input.value = value ? 'Yes' : 'No';
      input.required = true;
      input.addEventListener('change', () => {
        attendee.attending = value;
        update();
      });
      const checkmark = document.createElement('span');
      checkmark.className = 'checkmark';
      label.append(input, checkmark);
      line.append(label);
    }
    row.append(line);
    attendeesElement.append(row);
  });

  dietary.addEventListener('input', update);
  section.hidden = false;
  update();
  return guest;
}
