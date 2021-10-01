import { handleResponse, BASE_DOMAIN, requestOptions } from '../utility/actions.utils';
import { STATUS } from '../utility/uis.utils';

export const INPUT_CHANGED = 'LOGIN_INPUT_CHANGED';
export const REQUIRED_VALIDATION = 'LOGIN_REQUIRED_VALIDATION';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CLEAR_VALIDATION = 'LOGIN_CLEAR_VALIDATION';
export const CLEAR_UI = 'LOGIN_CLEAR_UI';
export const LOGOUT = 'LOGIN_LOGOUT';
export const STATUS_UPDATE = 'LOGIN_STATUS_UPDATE';

const LOGIN_URL = BASE_DOMAIN + "users/login";
const REGISTER_URL = BASE_DOMAIN + "users";

export const registerHandler = () => {
    return (dispatch, getState) => {
        if (validateUserPass()) {
            const body = { user: { email: getState().authentication.user.username, password: getState().authentication.user.password, username: getState().authentication.user.username } };
            return requestHandler(REGISTER_URL, body, dispatch);
        }
    }
};

export const loginHandler = () => {
    return (dispatch, getState) => {
        if (validateUserPass()) {
            const body = { user: { email: getState().authentication.user.username, password: getState().authentication.user.password } };
            return requestHandler(LOGIN_URL, body, dispatch);
        }
    }
};

const validateUserPass = () => {
    return (dispatch, getState) => {
        dispatch(requiredValidation('usermane'));
        dispatch(requiredValidation('password'));
        if (getState().authentication.validation.length > 0)
            return false;
        return true;
    }

};

const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS, user: user.user
    }
};

const loginFailed = (errors) => {
    return {
        type: LOGIN_FAILED, errors
    }
};

const updateStatus = (status) => {
    return {
        type: STATUS_UPDATE, status
    }
};


export const clearValidation = () => {
    return {
        type: CLEAR_VALIDATION
    }
};

export const inputChangeHandler = (value, property) => {
    return {
        type: INPUT_CHANGED, property, value
    }
};

export const requiredValidation = (field) => {
    return {
        type: REQUIRED_VALIDATION, field
    }
};

export const clear = () => {
    return {
        type: CLEAR_UI
    }
};

export const logoutUser = () => {
    return {
        type: LOGOUT
    }
};

const requestHandler = (url, body, dispatch) => {
    dispatch(updateStatus(STATUS.loading))
    return fetch(url, requestOptions('POST', body, null))
        .then(handleResponse)
        .then(user => {
            if (user.errors) {
                dispatch(loginFailed(user.errors));
                dispatch(updateStatus(STATUS.validate))
            } else {
                dispatch(loginSuccess(user));
                dispatch(updateStatus(STATUS.loaded))
            }
        }).catch((errors) => { dispatch(loginFailed(errors));dispatch(updateStatus(STATUS.validate)) });
};