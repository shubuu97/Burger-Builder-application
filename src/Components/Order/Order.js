 import React from 'react';

 const order = (props) => {
   const ingredients = [];
   for(let ingName in props.ingredients) {
      ingredients.push({
        name: ingName,
        amount: props.ingredients[ingName]
      });
   }

   const ingredientsOutput = ingredients.map(ingredient => {
     return (
       <span
            key={ingredient.name}
            style={{
                padding: '8px',
                margin: '8px',
                border: '1px solid #ccc',
                boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
                textTransform: 'capitalize'}}>
            {ingredient.name} ({ingredient.amount})
       </span>
     )
   });

   return (
     <div className="container">
      <div className="panel-group">
        <div className="panel panel-primary">
          <div className="panel-heading">Ingredients</div>
          <div className="panel-body">{ingredientsOutput}</div>
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">Price</div>
          <div className="panel-body">USD {props.price.toFixed(2)}</div>
        </div>
      </div>
     </div>
   )
 }

 export default order;
