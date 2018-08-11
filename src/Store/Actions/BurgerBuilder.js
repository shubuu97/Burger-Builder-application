import * as actionTypes from './ActionTypes';
import axios from '../../axios-order';

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingName: ingredient
    }
}

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingName: ingredient
    }
}

export const updateIngredients = (ingredients) => {
    return {
        type: actionTypes.UPDATE_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-7f114.firebaseio.com/ingredient.json')
            .then(response => {
                dispatch(updateIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }
}