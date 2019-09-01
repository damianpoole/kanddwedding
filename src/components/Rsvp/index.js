import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Styles from './rsvp.module.css';

const RSVP = ({ guest = { guests: [] } }) => {
  const [submission, setSubmission] = useState('');
  const [form, setForm] = useState({
    dietary: '',
  });

  const handleAttendanceChange = event => {
    const guest = event.target.dataset.name;
    setForm(prevstate => {
      return {
        ...prevstate,
        [guest]: event.target.value,
      };
    });
  };

  const handleDietaryChange = event => {
    setForm(prevstate => {
      return {
        ...prevstate,
        dietary: event.target.value,
      };
    });
  };

  useEffect(() => {
    setSubmission(JSON.stringify(form, null, 2));
  });

  const data = useStaticQuery(graphql`
    query {
      rsvpImage: file(relativePath: { eq: "kirstyanddamian.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <section id="rsvp" className={Styles.rsvp}>
      <div>
        <div>
          <h3>RSVP</h3>
          {guest.guests.map(({ name }) => {
            return (
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
                  />
                  <label htmlFor="no">Not Coming</label>
                  <input
                    type="radio"
                    id="no"
                    data-name={name}
                    name={name + '-attending'}
                    value="No"
                    onChange={handleAttendanceChange}
                  />
                </p>
              </div>
            );
          })}
          <label htmlFor="dietary">
            Any dietary requirements and who they’re for / any other comments:
          </label>
          <textarea
            id="dietary"
            onChange={handleDietaryChange}
            rows="8"
            cols="32"
          />

          <form name="rsvp" action="/success" method="post" data-netlify="true">
            <input type="hidden" name="values" value={submission} />
            <input type="hidden" name="form-name" value="rsvp" />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className={Styles.avatarContainer}>
          <Img
            className={Styles.avatar}
            fluid={data.rsvpImage.childImageSharp.fluid}
          />
        </div>
      </div>
    </section>
  );
};

export default RSVP;
