import React from 'react';

import Styles from './nav.module.css';

const Nav = () => (
  <nav className={Styles.nav}>
    <a href="#gettingthere">Getting There</a>
    <a href="#dayplan">Day Plan</a>
    <a href="#accommodation">Accommodation</a>
    <a href="#rsvp">RSVP</a>
    <a href="#whattowear">What to wear</a>
    <a href="#gifts">Gifts</a>
  </nav>
);

export default Nav;
