import axios from 'axios';
import * as actionTypes from './ActionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkTimeout = (expiryTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiryTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD56uJhY_k0b7PI8gq9q700Mn-LpPwAbKA';
        if(!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD56uJhY_k0b7PI8gq9q700Mn-LpPwAbKA';
        }

        dispatch(authStart())
        axios.post(url, authData)
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkTimeout(response.data.expiresIn))
            }) 
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if(!token) {
            dispatch(authLogout());
            // document.location.reload(true);
        } else {
            const userId = localStorage.getItem('userId');
            if (expirationTime <= new Date()) {
                dispatch(authLogout());
            } else {
                dispatch(authSuccess(token, userId));
                dispatch(checkTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};
