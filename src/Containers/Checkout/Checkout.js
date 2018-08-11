 import React, {Component} from 'react';
 import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
 import {Route, Redirect} from 'react-router-dom';
 import ContactData from './ContactData/ContactData';
 import {connect} from 'react-redux';

 class checkout extends Component {
   checkoutCancelledHandler = () => {
     this.props.history.goBack();
   }

   checkoutContinuedHandler = () => {
     this.props.history.replace('/checkout/contact-data');
   }

   render() {
     let checkout = <Redirect to='/' />; 
     if(this.props.ingredients) {
       const redirectToHome = this.props.purchased ? <Redirect to='/' /> : null;
       checkout = (
        <div>
          {redirectToHome}
           <CheckoutSummary
             ingredients={this.props.ingredients}
             checkoutCancelled={this.checkoutCancelledHandler}
             checkoutContinued={this.checkoutContinuedHandler} />
             <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
        </div>
        );
     }
     return checkout;
   }
 }

 const mapStateToProps = state => {
   return {
     ingredients: state.burgerBuilder.ingredients,
     purchased: state.order.purchased
   }
 }

 export default connect(mapStateToProps)(checkout);
