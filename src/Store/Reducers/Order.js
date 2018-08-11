import * as actionTypes from '../Actions/ActionTypes';

const INITIAL_STATE = {
    orders: [],
    loading: false,
    purchased: false,
    error: ''
}

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INITIALIZED: {
            return {
                ...state,
                loading: false,
                purchased: false
            }
        }

        case actionTypes.ORDER_REQUEST_INITIATED: {
            return {
                ...state, 
                loading: true,
                purchased: false
            }
        }

        case actionTypes.ORDER_REQUEST_START: {
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };

            return {
                    ...state,
                    loading: false,
                    purchased: true,
                    orders: state.orders.concat(newOrder)
            }           
        }

        case actionTypes.ORDER_REQUEST_FAIL: {
            return {
                ...state,
                loading: false
            }
        }

        case actionTypes.FETCH_ORDERS_START: {
            return {
                ...state,
                loading: true
            }
        }

        case actionTypes.FETCH_ORDERS_SUCCESS: {
            return {
                ...state,
                loading: false,
                orders: action.orders,
                error: false
            }
        }

        case actionTypes.FETCH_ORDERS_FAIL: {
            return {
                ...state,
                loading: false,
                error: 'Can not load orders'
            }
        }
        default:
         return state;
    }
}

export default orderReducer;