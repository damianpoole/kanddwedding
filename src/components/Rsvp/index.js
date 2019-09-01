import React from 'react';

const RSVP = ({ guest }) => {
  console.log(guest);
  const name = guest.name.split(' ')[0];
  const event = guest.type == 'all' ? 'Wedding' : 'Reception';

  return (
    <>
      <h3>
        {name}, we would love you to attend our {event}
      </h3>
      <form>
        <input type="hidden"></input>
      </form>
    </>
  );
};

export default RSVP;
