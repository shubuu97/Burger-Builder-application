import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from '../Components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';
import Login from '../Authentication/Login';
import Logout from '../Authentication/Logout/Logout';
import * as actions from '../Store/Actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignIn()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAutoSignIn: () => dispatch(actions.checkAuthState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
