import React from 'react';
import Nav from '../Nav';

import Styles from './header.module.css';

const Header = ({ haveGuest }) => (
  <header className={Styles.header}>
    <div className="container">
      <Nav haveGuest={haveGuest}/>
    </div>
  </header>
);

export default Header;
