import React from 'react';

import Styles from './nav.module.css';

const Nav = ({ haveGuest }) => (
  <nav className={Styles.nav}>
    <div className={Styles.rsvp}>{haveGuest && <a href="#rsvp">RSVP</a>}</div>
    <div>
      <a href="#gettingthere">Getting There</a>
      <a href="#dayplan">Day Plan</a>
      <a href="#accommodation">Accommodation</a>
      <a href="#whattowear">What to wear</a>
      <a href="#whattowear">Gifts</a>
    </div>
  </nav>
);

export default Nav;
