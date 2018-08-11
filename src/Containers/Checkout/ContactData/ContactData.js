 import React, {Component} from 'react';
 import axios from '../../../axios-order';
 import Spinner from '../../../Components/UI/Spinner/Spinner';
 import {connect} from 'react-redux'; 
 import * as actions from '../../../Store/Actions/index';
 import withErrorHandler from '../../../HigherOrderComponent/withErrorHandler/withErrorHandler';

 class contactData extends Component {

   state = {
     orderForm: {
       name: '',
       email: '',
       phone: '',
       address: {
         street: '',
         city: '',
         country: '',
         zip: ''
       },
       deliveryMethod: ''
     }
   }

   orderClickHandler = (event) => {
     event.preventDefault();
     this.setState({ loading: true });
      const order = {
        ingredient: this.props.ingredients,
        price: this.props.price,
        customerInformation: this.state.orderForm,
        userId: this.props.userId
      }
      this.props.onOrder(order, this.props.token)
   }

   inputChanged = (event, inputIdentifier) => {
     const updatedOrderForm = {
       ...this.state.orderForm
     }

     updatedOrderForm[inputIdentifier] = event.target.value;
     this.setState({orderForm: updatedOrderForm});
   };

    addressChanged = (event, addressField) => {
      const address = {
        ...this.state.orderForm.address
      }
      address[addressField] = event.target.value;
      this.setState(
        prevState => {
          return {orderForm: {...prevState.orderForm, address}}
        }
      );
    }

   render() {
    let form = (
      <div className="container" style={{ marginTop: '20px' }}>
        <h1>Enter your contact details:</h1>
        <form onSubmit={this.orderClickHandler.bind(this)}>
          <div className="form-group">
            <input value={this.state.orderForm.name} onChange={(event) => this.inputChanged(event, 'name')} type="text" name="name" placeholder="Enter your name..." className="form-control" />
          </div>
          <div className="form-group">
            <input value={this.state.orderForm.email} onChange={(event) => this.inputChanged(event, 'email')} type="email" name="email" placeholder="Enter your email..." className="form-control" />
          </div>
          <div className="form-group">
            <input value={this.state.orderForm.phone} onChange={(event) => this.inputChanged(event, 'phone')} type="phone" name="phone" placeholder="Enter your phone no..." className="form-control" />
          </div>
          <div className="form-group">
            <input value={this.state.orderForm.address.street} onChange={(event) => this.addressChanged(event, 'street')} type="text" name="street" placeholder="Enter your street..." className="form-control" />
          </div>
          <div className="form-group">
            <input value={this.state.orderForm.address.city} onChange={(event) => this.addressChanged(event, 'city')} type="text" name="city" placeholder="Enter your city..." className="form-control" />
          </div>
          <div className="form-group">
            <input value={this.state.orderForm.address.country} onChange={(event) => this.addressChanged(event, 'country')} type="text" name="Country" placeholder="Enter your Country..." className="form-control" />
          </div>
          <div className="form-group">
            <input value={this.state.orderForm.address.zip} onChange={(event) => this.addressChanged(event, 'zip')} type="text" name="Zip" placeholder="Enter your zip code..." className="form-control" />
          </div>
          <select value={this.state.orderForm.deliveryMethod} onChange={(event) => this.inputChanged(event, 'deliveryMethod')}
            name="Delivery Method"
            className="custom-select custom-select-lg mb-3 form-group">
            <option className="form-control" selected value="delivery method">Select your delivery method</option>
            <option className="form-control" value="cheapest">Cheapest</option>
            <option className="form-control" value="fastest">Fastest</option>
          </select>
          <button className="btn btn-success" onClick={this.orderClickHandler}>Order Now</button>
        </form>
      </div>
    )

    if(this.props.loading) {
      form = <Spinner />
    }

    return form;
   }
 }

 const mapStateToProps = state => {
   return {
     ingredients: state.burgerBuilder.ingredients,
     price: state.burgerBuilder.totalPrice,
     loading: state.order.loading,
     purchased: state.order.purchased,
     token: state.auth.idToken,
     userId: state.auth.localId
   }
 }

 const mapDispatchToProps = dispatch => {
   return {
     onOrder: (order, token) => dispatch(actions.orderInitiated(order,token))
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));
