import React from 'react';

import Styles from './dayplan.module.css';

const DayPlan = ({ guest }) => {
  const allDay = guest.type === 'wedding';
  return (
    <section id="dayplan" className={Styles.dayplan}>
      <div>
        <h2>Day Plan</h2>

        <h3>Saturday 30th November 2019</h3>

        {allDay ? (
          <p>
            12.30pm - 1pm Arrive at venue
            <br />
            <span>
              The venue isn’t allowed to serve drinks before the ceremony due to
              some old laws about their bar being (almost) open plan. If you
              wish to have a drink before then there is a bar behind the venue
              called <a href="http://www.stodfold.com/">Stod Fold</a>
            </span>
            <br />
            <br />
            1pm Ceremony starts
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
        <p>(*this might change)</p>
      </div>
    </section>
  );
};

export default DayPlan;
