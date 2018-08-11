import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    idToken: null,
    localId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case actionTypes.AUTH_SUCCESS: {
            return {
                ...state,
                loading: false,
                idToken: action.idToken ,
                localId: action.localId,
                error: null
            }
        }
        case actionTypes.AUTH_LOGOUT: {
            return {
                ...state,
                idToken: null,
                localId: null
            }
        }
        case actionTypes.AUTH_FAIL: {
            return {
                ...state, 
                loading: false,
                error: action.error
            }
        }
        case actionTypes.SET_AUTH_REDIRECT_PATH: {
            return {
                ...state,
                authRedirectPath: action.path
            }
        }
        default:
            return state;
    }
}

export default authReducer;