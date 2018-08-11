import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../HigherOrderComponent/Hoc';
import BackDrop from '../../UI/BackDrop/BackDrop';

const sideDrawer = (props) => {
  let assignedClass = [classes.SideDrawer, classes.Close];

  if(props.open) {
    assignedClass = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
    <BackDrop show={props.open} clicked={props.closed}/>
      <div className={assignedClass.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;
