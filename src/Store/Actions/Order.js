import * as actionTypes from './ActionTypes';
import axios from '../../axios-order';

export const orderStart = (id, orderData) => {
    return {
        type: actionTypes.ORDER_REQUEST_START,
        orderId: id,
        orderData: orderData
    }
}

export const orderFail = (error) => {
    return {
        type: actionTypes.ORDER_REQUEST_FAIL,
        error: error
    }
}

export const orderRequestInitiated = () => {
    return {
        type: actionTypes.ORDER_REQUEST_INITIATED
    }
}

export const orderInitiated = (orderData, token) => {
    return dispatch => {
        dispatch(orderRequestInitiated())
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(orderStart(response.data.name,orderData))
            })
            .catch(error => {
               dispatch(orderFail(error)) 
            });
    }
}

export const initializingPurchase = () => {
    return {
        type: actionTypes.PURCHASE_INITIALIZED
    }
}


export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryparam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryparam)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            })
    }
}