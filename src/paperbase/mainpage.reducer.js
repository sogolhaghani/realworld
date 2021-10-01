// import _ from 'lodash';

const initState = {
    user: {},
    validations: [],
    status: 'init'
}


export default function reducer(state = initState, action) {
    // let newState = _.clone(state, {});
    switch (action.type) {
        default:
            return state;
    }
}