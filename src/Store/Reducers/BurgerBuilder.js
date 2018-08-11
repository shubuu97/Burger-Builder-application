import * as actionTypes from '../Actions/ActionTypes';

const INITIAL_STATE = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENTS_PRICE = {
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4,
    salad: 0.2
}

const reducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingName],
                building: true
            }
        }
        case actionTypes.REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingName],
                building: true
            }
        }
        case actionTypes.UPDATE_INGREDIENTS: {
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    meat: action.ingredients.meat,
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon,
                },
                totalPrice: 4,
                error: false,
                building: false
            }
        }
        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                error: true
            }
        }
        default: 
            return state;
    }
}

export default reducer;