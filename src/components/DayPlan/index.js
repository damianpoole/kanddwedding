import React from 'react';

import Styles from './dayplan.module.css';

const DayPlan = ({ guest }) => {
  const allDay = guest.type === 'wedding';
  return (
    <section id="dayplan" className={Styles.dayplan}>
      <div>
        <h2>Day Plan</h2>
        {allDay ? (
          <p>
            1pm Ceremony
            <br />
            1.30pm Welcome drinks at the bar
            <br />
            3pm Wedding breakfast*
            <br />
            5pm Finish wedding breakfast &amp; speeches*
            <br />
            7pm Evening guests arrive
            <br />
            8pm First dance/Cake cutting*
            <br />
            8.30pm/9pm Evening food*
          </p>
        ) : (
          <p>
            7pm Evening guests arrive
            <br />
            8pm First dance/Cake cutting*
            <br />
            8.30pm/9pm Evening food*
          </p>
        )}
        <p>(*subject to change)</p>
      </div>
    </section>
  );
};

export default DayPlan;
