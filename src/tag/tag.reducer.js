import * as types from './tag.action';
import _ from 'lodash';


const initState = {
    all: [],
    status: 'init'
}


export default function reducer(state = initState, action) {
    let newState = _.clone(state, {});
    switch (action.type) {
        case types.LOAD_TABLE_SUCCESS:
            newState.all = action.data.tags
            return newState
        default:
            return state;
    }
}