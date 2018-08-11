import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'}
];

const buildControls = (props) => {
    return (
      <div className={classes.BuildControls}>
      <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
          return <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => props.ingredientsAdded(ctrl.type)}
            removed={() => props.ingredientsRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />
        })}
        <button
          disabled={!props.buttonState}
          className={classes.OrderButton}
          onClick={props.ordered}>
            {props.isAuth ? 'Order Now' : 'Sign Up to order'}
        </button>
      </div>
    );
}

export default buildControls;
