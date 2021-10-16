import * as types from './article.action';

import _ from 'lodash';
import * as utils from '../utility/reducers.util';


const initState = {
    table: {
        order: 'asc',
        orderBy: 'id',
        list: [],
        pageItem: { rowsPerPage: 10, page: 1 }
    },
    entity: {tagList :[]},
    validations: [],
    status: 'init'
}


export default function reducer(state = initState, action) {
    let newState = _.cloneDeep(state, {});
    switch (action.type) {
        case types.LOAD_TABLE_SUCCESS:
            newState.table.list = action.data.articles
            return newState
        case types.PAGE_CHANGE:
            newState.table.pageItem.page = action.page
            return newState
        case types.LOAD_ENTITY_SUCCESS:
            newState.entity = action.data.article
            return newState
        case types.CLEAR_UI:
            return initState
        case types.INPUT_CHANGED:
            return utils.updateProperty(state, action);
        case types.CLEAR_VALIDATION:
            newState.validations = []
            return newState;
        case types.SERVER_ERQUEST_FAILED: 
            return utils.updateServerValidation(state, action);
        case types.REQUIRED_VALIDATION:
            return utils.updateRequiredValidation(state, action)
        case types.STATUS_UPDATE:
            return utils.updateStatus(state, action)
            
        default:
            return state;
    }
}