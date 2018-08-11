import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
  <div className={classes.ShowToggler}>
    <div onClick={props.clicked} className="fa fa-bars"></div>
  </div>
);

export default drawerToggle;
