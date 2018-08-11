import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../Assests/images/burger-logo.png';

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height}}>
    <img src={burgerLogo} alt="My burger" />
  </div>
);

export default logo;
