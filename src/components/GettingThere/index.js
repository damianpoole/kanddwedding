import React from 'react';

import Styles from './getting.module.css';

const GettingThere = () => (
  <section className={Styles.gettingThere}>
    <div>
      <div className={Styles.grid}>
        <div className={Styles.address}>
          <h2>Getting There</h2>
          <address>
            The Arches,
            <br />
            E Mill, 328 Dean Clough,
            <br />
            Halifax,
            <br />
            HX3 5AX
          </address>
        </div>
        <div className={Styles.transportMethod}>
          <h3>By Car</h3>
          <p>There is free parking onsite</p>
        </div>
        <div className={Styles.transportMethod}>
          <h3>By Train</h3>
          <p>
            There is a train station in Halifax which is approximately a 20
            minute walk away from the venue
          </p>
        </div>
      </div>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2360.437342363741!2d-1.866244684484316!3d53.7282851537351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487be80749657993%3A0xab9868995d0e85c!2sThe+Arches!5e0!3m2!1sen!2suk!4v1566243324590!5m2!1sen!2suk"
      width="100%"
      height="450"
      frameBorder="0"
      style={{
        border: 0,
      }}
      allowFullScreen
    ></iframe>
  </section>
);

export default GettingThere;
