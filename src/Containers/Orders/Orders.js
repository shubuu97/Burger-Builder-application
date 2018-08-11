 import React, {Component} from 'react';
 import Order from '../../Components/Order/Order';
 import axios from '../../axios-order';
 import {connect} from 'react-redux';
 import * as actions from '../../Store/Actions/index';
 import withErrorHandler from '../../HigherOrderComponent/withErrorHandler/withErrorHandler';
 import Spinner from '../../Components/UI/Spinner/Spinner';

 class Orders extends Component {
   componentDidMount() {
     this.props.fetchOrders(this.props.token, this.props.userId)
   }

   render() {
     let orders = <Spinner />;

      if(this.props.orders) {
        orders = (
          <div>
            {this.props.orders.map(order => (
              <Order
                key={order.id}
                ingredients={order.ingredient}
                price={order.price} />
            ))}
          </div>
        )
      } 
      const errorToShow = this.props.error ? <p style={{color: 'red', textAlign: 'center', fontSize: '1.2em'}}>{this.props.error}</p> : null;
      return (
        <div>
          {orders}
          {errorToShow}
        </div>
      )
   }
 }

 const mapStateToProps = state => {
   return {
    orders: state.order.orders, 
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.idToken,
    userId: state.auth.localId
   }
 }

 const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
 }

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
