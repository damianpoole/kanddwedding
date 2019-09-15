import React from 'react';
import Styles from './accomadation.module.css';

const Accomadation = () => (
  <section id="accommodation" className={Styles.accomadation}>
    <div>
      <h2>Accomadation</h2>
      <div>
        <h3>
          <a href="https://www.travelodge.co.uk/hotels/132/Halifax-hotel">
            Travelodge
          </a>
        </h3>
        <p>
          Address: Gate 9, Dean Clough Industrial Park, Halifax, HX3 5AY
          <br />
          Distance from Venue: 3 minute walk (0.2 miles)
        </p>

        <h3>
          <a href="https://www.premierinn.com/gb/en/hotels/england/west-yorkshire/halifax/halifax-town-centre.html">
            Premier Inn
          </a>
        </h3>
        <p>
          Address: Broad Street Plaza, Halifax, HX1 1YA
          <br />
          Distance from Venue: approx. 10 minute walk (0.5 miles)
        </p>

        <h3>
          <a href="http://www.whiteswanhalifax.com/en/">The White Swan</a>
        </h3>
        <p>
          Address: Princess Street, Halifax West Yorkshire, HX1 1TS
          <br /> Distance from Venue: approx. 10 minute walk (0.5 miles)
        </p>

        <p>
          For more hotels here’s a{' '}
          <a
            href="https://bit.ly/2HFQA9I"
            target="_blank"
            rel="noopener noreferrer"
          >
            handy link to booking.com
          </a>{' '}
          for the night of the wedding (based on 2 people)
        </p>
      </div>
    </div>
  </section>
);

export default Accomadation;
