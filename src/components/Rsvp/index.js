import React, { useState } from 'react';

const RSVP = ({ guest = { guests: [] } }) => {
  const event = guest.type == 'wedding' ? 'Wedding' : 'Reception';
  const [submission, setSubmission] = useState();
  const formResult = {
    dietary: '',
  };

  const handleAttendanceChange = event => {
    const guest = event.target.dataset.name;
    formResult[guest] = event.target.value;
    setSubmission(formResult);
  };

  const handleDietaryChange = event => {
    formResult.dietary = event.target.value;
    setSubmission(formResult);
  };

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
              name="attending"
              value="Yes"
              onChange={handleAttendanceChange}
            />
            <label htmlFor="yes">Yes</label>
            <input
              type="radio"
              id="no"
              data-name={name}
              name="attending"
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

      <form name="rsvp" method="POST" netlify>
        <input type="submit" value="Submit" />
        <input
          type="hidden"
          name="values"
          value={JSON.stringify(submission, 2, null)}
        />
      </form>
    </>
  );
};

export default RSVP;
