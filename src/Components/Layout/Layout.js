import React, { Component } from 'react';
import classes from './Layout.css';
import {connect} from 'react-redux';

import Aux from '../../HigherOrderComponent/Hoc';
import Toolbar from '../Navigation/Toolbaar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false});
  }

  DrawerTogglerClickedHandler = () => {
    this.setState ((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar 
          isAuth={this.props.isAuthenticated}
          DrawerTogglerClicked={this.DrawerTogglerClickedHandler}/>
        <SideDrawer
              isAuth={this.props.isAuthenticated}
              open={this.state.showSideDrawer}
              closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.mt_20}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

export default connect(mapStateToProps)(Layout);
