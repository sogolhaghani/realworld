import _ from 'lodash';

export const updateStatus = (state, action) => {
    let newState = _.cloneDeep(state, {});
    newState.status = action.status
    return newState;
}

export const updateProperty = (state, action, entityName = 'entity') => {
    let newState = _.cloneDeep(state, {});
    newState[entityName][action.property] = action.value;
    return newState;
}

export const updateServerValidation = (state, action) => {
    let newState = _.cloneDeep(state, {});
    newState.validations.push({ messege: action.data })
    return newState;
}

export const updateRequiredValidation = (state, action, entityName = 'entity') => {
    let newState = _.cloneDeep(state, {});
    const field = newState[entityName][action.field];
    if (!field || field.length === 0) {
        if (newState.validations.filter(f => f.field === action.field && f.type === 'REQUIRED').length > 0)
            return state;
        newState.validations.push({ field: action.field, type: 'REQUIRED' });
    } else {
        const newVal = newState.validations.filter(f => f.field !== action.field || f.type !== 'REQUIRED')
        newState.validations = newVal
    }
    return newState;
}

