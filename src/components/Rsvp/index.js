import React from 'react';

const RSVP = ({ guest }) => {
  const event = guest.type == 'wedding' ? 'Wedding' : 'Reception';

  const formResult = {
    dietary: '',
  };

  const handleAttendanceChange = event => {
    const guest = event.target.dataset.name;
    formResult[guest] = event.target.value;
  };

  const handleDietaryChange = event => {
    formResult.dietary = event.target.value;
  };

  const handleSubmit = event => {
    console.log(JSON.stringify(formResult, null, 2));
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

      <input type="submit" value="submit" onClick={handleSubmit} />

      <form>
        <input type="hidden"></input>
      </form>
    </>
  );
};

export default RSVP;
