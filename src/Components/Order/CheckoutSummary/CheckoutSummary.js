 import React from 'react';
 import Burger from '../../Burger/Burger';
 import Button from '../../UI/Button/Button';
 import classes from './CheckoutSummary.css';
 const checkoutSummary = (props) => {
   return (
     <div>
       <h1 style={{textAlign: 'center', marginBottom: '40px'}}>We hope that it tastes well!</h1>
       <div className = {classes.CheckoutSummary}>
          <div style={{margin: 'auto', width: '100%'}}>
            <Burger ingredients={props.ingredients} />
          </div>
          <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
          <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
       </div>
     </div>
   )
 }

 export default checkoutSummary;
