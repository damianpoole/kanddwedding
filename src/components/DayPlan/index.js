import React from 'react';

import Styles from './dayplan.module.css';

const DayPlan = ({ guest }) => {
  const allDay = guest.type === 'all';
  return (
    <section className={Styles.dayplan}>
      <div>
        <h2>The Plan for the Day</h2>
        {allDay ? (
          <p>
            1pm - Ceremony followed by drinks reception
            <br />
            3pm - Sit down for some food
            <br />
            5pm - Speeches
            <br />
            6pm - Cut the cake
            <br />
            7pm - Dancing Time!!
          </p>
        ) : (
          <p>7pm - Dancing Time!!</p>
        )}
      </div>
    </section>
  );
};

export default DayPlan;
