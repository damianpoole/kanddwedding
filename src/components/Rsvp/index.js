import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Styles from './rsvp.module.css';
import AttendingInput from '../AttendingInput';

const RSVP = ({ guest = { guests: [] } }) => {
  const [submission, setSubmission] = useState('');
  const [form, setForm] = useState({
    guests: {},
    dietary: '',
  });
  const [disabled, setDisabled] = useState(true);

  const handleAttendanceChange = event => {
    const guest = event.target.dataset.name;
    event.persist();
    setForm(prevstate => {
      return {
        ...prevstate,
        guests: {
          ...prevstate.guests,
          [guest]: event.target.value === 'Yes' ? true : false,
        },
      };
    });
  };

  const handleDietaryChange = event => {
    event.persist();
    setForm(prevstate => {
      return {
        ...prevstate,
        dietary: event.target.value,
      };
    });
  };

  const dataAvailable = useRef();

  useEffect(() => {
    if (!dataAvailable.current) {
      const guestsResults = guest.guests.reduce((acc, val) => {
        acc[val['name']] = null;
        return acc;
      }, {});

      setForm({
        guests: guestsResults,
        dietary: '',
      });
      dataAvailable.current = guest.guests.length > 0;
    }

    if (dataAvailable.current) {
      setSubmission(JSON.stringify(form, null, 2));

      const guests = Object.values(form.guests);
      const keys = Object.keys(form.guests);

      if (guests.length > 0 && keys.length === guests.length) {
        const empties = guests.filter(x => x === null);
        setDisabled(empties.length > 0);
      }
    }
  }, [form]);

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
              <AttendingInput
                handleAttendanceChange={handleAttendanceChange}
                name={name}
              />
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
            <button type="submit" disabled={disabled}>
              Submit
            </button>
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
