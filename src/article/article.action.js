import { handleResponse, requestGetOptions, requestDeleteOptions, requestOptions, BASE_DOMAIN } from '../utility/actions.utils';

import { STATUS } from '../utility/uis.utils';

const ARTICLE_URL = BASE_DOMAIN + "articles";
export const LOAD_TABLE_SUCCESS = "ARTICLE_LOAD_TABLE_SUCCESS";
export const LOAD_ENTITY_SUCCESS = "ARTICLE_LOAD_ENTITY_SUCCESS";
export const SERVER_ERQUEST_FAILED = "ARTICLE_SERVER_ERQUEST_FAILED";
export const PAGE_CHANGE = "ARTICLE_PAGE_CHNAGE";
export const CLEAR_UI = "ARTICLE_CLEAR_UI";
export const STATUS_UPDATE = "ARTICLE_STATUS_UPDATE";

export const CLEAR_VALIDATION = 'ARTICLE_CLEAR_VALIDATION';
export const INPUT_CHANGED = 'ARTICLE_INPUT_CHANGED';
export const REQUIRED_VALIDATION = 'ARTICLE_REQUIRED_VALIDATION';

export function loadAllArticles() {
    return (dispatch, getState) => {
        let pageItem = getState().article.table.pageItem;
        const token = getState().authentication.token;
        const address = ARTICLE_URL + "?offset=" + (pageItem.page - 1) + "&limit=" + pageItem.rowsPerPage;
        dispatch(updateStatus(STATUS.loading))
        fetch(address, requestGetOptions(token))
            .then(handleResponse)
            .then(response => {dispatch(allArticlesSuccess(response)); dispatch(updateStatus(STATUS.list))})
            .catch((error) => {dispatch(addValidation(error)); dispatch(updateStatus(STATUS.validate))});
    }
};



export const loadArticle = (id) => {
    return (dispatch, getState) => {
        const address = ARTICLE_URL + "/" + id;
        const token = getState().authentication.token;
        dispatch(updateStatus(STATUS.loading))
        fetch(address, requestGetOptions(token))
            .then(handleResponse)
            .then(response => {dispatch(loadArticleSuccess(response)); dispatch(updateStatus(STATUS.loaded))})
            .catch((error) => {dispatch(addValidation(error)); dispatch(updateStatus(STATUS.validate))});
    }
};

export const deleteArticle = (id) => {
    return (dispatch, getState) => {
        const address = ARTICLE_URL + "/" + id;
        const token = getState().authentication.token;
        dispatch(updateStatus(STATUS.loading));
        fetch(address, requestDeleteOptions(token))
            .then(handleResponse)
            .then(() => {
                dispatch(pageChange(1))
                dispatch(loadAllArticles())
                dispatch(updateStatus(STATUS.loaded))
            })
            .catch((error) => {dispatch(addValidation(error));dispatch(updateStatus(STATUS.validate))});
    }
};


export const onSubmitArticle = () => {
    return (dispatch, getState) => {
        dispatch(updateStatus(STATUS.loading));
        if (validateArticle()) {
            const article = getState().article.entity;
            const address = ARTICLE_URL + (article.slug ? ("/" + article.slug) : "");
            const method = article.slug ? 'PUT' : 'POST';
            const apiAricle = { article: article }
            const token = getState().authentication.token;
            
            fetch(address, requestOptions(method, apiAricle, token))
                .then(handleResponse)
                .then(response => {
                    dispatch(updateStatus(STATUS.saved))
                })
                .catch((error) => {
                    dispatch(addValidation(error)); 
                    dispatch(updateStatus(STATUS.validate))
                });
                
        }else{
            dispatch(updateStatus(STATUS.validate));
        }
    }
}


export const pageChange = (page) => {
    return {
        type: PAGE_CHANGE, page
    }
}

const allArticlesSuccess = (data) => {
    return {
        type: LOAD_TABLE_SUCCESS, data
    }
}


const addValidation = (data) => {
    return {
        type: SERVER_ERQUEST_FAILED, data
    }
}

const loadArticleSuccess = (data) => {
    return {
        type: LOAD_ENTITY_SUCCESS, data
    }
}

export const clearUI = () => {
    return {
        type: CLEAR_UI
    }
}

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

const validateArticle = () => {
    return (dispatch, getState) => {
        dispatch(requiredValidation('title'))
        if (getState().article.validations.length > 0)
            return false;
        return true;
    }
}

export const updateStatus = (status) => {
    return{
        type : STATUS_UPDATE, status
    }
}