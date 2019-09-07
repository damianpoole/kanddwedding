import React, { useState } from 'react';

export default ({ name, handleAttendanceChange }) => {
  const [plusOne, setPlusOne] = useState();

  return (
    <>
      {name === '' ? (
        <div key={name}>
          <p>
            <input type="text" value={plusOne} />
            <label htmlFor="yes">Coming</label>
            <input
              type="radio"
              id="yes"
              data-name={plusOne}
              name={name + '-attending'}
              value="Yes"
              onChange={handleAttendanceChange}
              required
            />
            <label htmlFor="no">Not Coming</label>
            <input
              type="radio"
              id="no"
              data-name={name}
              name={name + '-attending'}
              value="No"
              onChange={handleAttendanceChange}
              required
            />
          </p>
        </div>
      ) : (
        <div key={name}>
          <p>
            <span>{name}:</span>
            <label htmlFor="yes">Coming</label>
            <input
              type="radio"
              id="yes"
              data-name={name}
              name={name + '-attending'}
              value="Yes"
              onChange={handleAttendanceChange}
              required
            />
            <label htmlFor="no">Not Coming</label>
            <input
              type="radio"
              id="no"
              data-name={name}
              name={name + '-attending'}
              value="No"
              onChange={handleAttendanceChange}
              required
            />
          </p>
        </div>
      )}
    </>
  );
};
