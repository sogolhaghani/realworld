import _ from 'lodash';
import * as types from './authentication.actions';
import * as utils from '../utility/reducers.util';

const initState = {
    user: {},
    isAuthenticated : false,
    token: null,
    validations: []
}


export default function reducer(state = initState, action) {
    let newState = _.cloneDeep( state);
    switch (action.type) {
        case types.STATUS_UPDATE:
            return utils.updateStatus(state, action)
        case types.CLEAR_UI:
            return initState;
        case types.INPUT_CHANGED:
            return utils.updateProperty(state, action, 'user');
        case types.LOAD_USER_SUCCESS:
            newState.user = action.user.user;
            newState.token = action.user.token;
            return newState;
        case types.LOGIN_SUCCESS:
            newState.token = action.user.token;
            newState.isAuthenticated = true;
            return newState;
        case types.LOGIN_FAILED:
            newState.isAuthenticated = false;
            newState.validations.push({ field: null, type: 'login_failed' });
            return newState;
        case types.LOGOUT:
            return initState;
        case types.CLEAR_VALIDATION: 
            return initState.validations;;
        case types.REQUIRED_VALIDATION:
            return utils.updateRequiredValidation(state, action,'user')

        default:
            return state
    }
}