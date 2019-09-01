import React, { useState, useEffect } from 'react';

const RSVP = ({ guest = { guests: [] } }) => {
  const event = guest.type == 'wedding' ? 'Wedding' : 'Reception';
  const [submission, setSubmission] = useState('');
  const [form, setForm] = useState({
    dietary: '',
  });

  const handleAttendanceChange = event => {
    const guest = event.target.dataset.name;
    setForm(prevstate => {
      return {
        ...prevstate,
        [guest]: event.target.value,
      };
    });
  };

  const handleDietaryChange = event => {
    setForm(prevstate => {
      return {
        ...prevstate,
        dietary: event.target.value,
      };
    });
  };

  useEffect(() => {
    setSubmission(JSON.stringify(form, null, 2));
  });

  return (
    <>
      <h3>We would love you to attend our {event}</h3>
      {guest.guests.map(({ name }) => {
        return (
          <div key={name}>
            <p>{name}, can you attend?</p>
            <input
              type="radio"
              id="yes"
              data-name={name}
              name={name + '-attending'}
              value="Yes"
              onChange={handleAttendanceChange}
            />
            <label htmlFor="yes">Yes</label>
            <input
              type="radio"
              id="no"
              data-name={name}
              name={name + '-attending'}
              value="No"
              onChange={handleAttendanceChange}
            />
            <label htmlFor="no">No</label>
          </div>
        );
      })}
      <label htmlFor="dietary">Any dietary requirements?</label>
      <textarea
        id="dietary"
        onChange={handleDietaryChange}
        rows="8"
        cols="32"
      />

      <form name="rsvp" action="/success" method="post" data-netlify="true">
        <input type="hidden" name="values" value={submission} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default RSVP;
