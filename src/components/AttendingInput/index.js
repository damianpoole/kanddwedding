import React, { useState } from 'react';
import Styles from './input.module.css';

export default ({ name, handleAttendanceChange }) => {
  const [plusOne, setPlusOne] = useState();

  const handleNameChange = event => setPlusOne(event.target.value);
  const noId = `${name}-no`;
  const yesId = `${name}-yes`;

  return (
    <>
      <div className={Styles.attending} key={name}>
        <p>
          {name === '' ? (
            <input type="text" value={plusOne} onChange={handleNameChange} />
          ) : (
            <span>{name}:</span>
          )}
          <label htmlFor={yesId} className={Styles.container}>
            Coming
            <input
              type="radio"
              id={yesId}
              data-name={name}
              name={name + '-attending'}
              value="Yes"
              onChange={handleAttendanceChange}
              required
            />
            <span className={Styles.checkmark}></span>
          </label>

          <label htmlFor={noId} className={Styles.container}>
            Not Coming
            <input
              type="radio"
              id={noId}
              data-name={name}
              name={name + '-attending'}
              value="No"
              onChange={handleAttendanceChange}
              required
            />
            <span className={Styles.checkmark}></span>
          </label>
        </p>
      </div>
    </>
  );
};
