import React from 'react';
import Nav from '../Nav';

import Styles from './header.module.css';

const Header = () => (
  <header className={Styles.header}>
    <div className="container">
      <Nav />
    </div>
  </header>
);

export default Header;
