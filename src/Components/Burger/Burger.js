import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
  // This is also a nice trick to transform object into array
  // let transformedIngredients = Object.keys(props.ingredients)
  //   .map((igKey) => {
  //     return [...Array(props.ingredients[igKey])].map((_, i) => {
  //       return <BurgerIngredient key={igKey + i} type={igKey} />
  //     });
  //   }).reduce((total, currentVal) => {
  //     return total.concat(currentVal);
  //   });

  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({
      ingredient: ingName,
      value: props.ingredients[ingName]
    })
  }


  let transformedIngredients = ingredients.map(ingredient => {
    return [...Array(ingredient.value)].map((_, i) => {
      return <BurgerIngredient type={ingredient.ingredient} key={ingredient.ingredient + i} />
    });
  }).reduce((total, currentVal) => {
    return total.concat(currentVal);
  });

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p className={classes.Text}>Start adding some ingredients.</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};


export default burger;
