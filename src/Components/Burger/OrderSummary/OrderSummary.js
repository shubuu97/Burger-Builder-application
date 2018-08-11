import React, { Component } from 'react';
import Aux from '../../../HigherOrderComponent/Hoc';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const modalList = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (<li key={igKey}>
          <span style={{ textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>)
      });
    return (
      <Aux>
        <h3>Your list of items: </h3>
        <ul>
          {modalList}
        </ul>
        <p><strong>Total Price: <span>{this.props.totalPrice.toFixed(2)}</span></strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.purchaseCanceled} btnType="Danger">Cancel</Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">Continue</Button>
      </Aux>
    )
  }
}

export default OrderSummary;
