import React, { Component } from 'react';
import Aux from '../../HigherOrderComponent/Hoc';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HigherOrderComponent/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../Store/Actions';

class BurgerBuilder extends Component {
  state = { 
    purchasing: false
  }

  componentDidMount() {
    this.props.fetchingIngredients()
  }
  //creating array of object's property example

  // updatePurchasableState(ingredients) {
  //   const total = Object.keys(ingredients)
  //     .map(igKey => {
  //       return ingredients[igKey];
  //     }).reduce((total, currentVal) => {
  //       return total + currentVal;
  //     }, 0);
  //     this.setState({purchasable: total > 0})
  // }

  purchaseHandler = () => {
    if(this.props.isAuthenticated) {
      this.setState({ purchasing: true })
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/login')
    }
  }

  purchaseCancelHandler = () => {
    this.setState ({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
    this.props.onPurchaseInitialized();
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? <p style={{ textAlign: 'center', color: 'red', fontSize: '1.2em'}}>Can not load ingredients</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
            <BuildControls
                ingredientsAdded={this.props.onIngredientAdded}
                ingredientsRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                price={this.props.price}
                isAuth={this.props.isAuthenticated}
                buttonState={this.props.price > 4}
                ordered={this.purchaseHandler}/>
        </Aux>
      )

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.props.price}
        />;
      }
        if(this.props.loading) {
           orderSummary = <Spinner />;
        }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          showBackDrop={this.purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    loading: state.burgerBuilder.loading,
    isAuthenticated: state.auth.idToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    fetchingIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInitialized: () => dispatch(actions.initializingPurchase()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
