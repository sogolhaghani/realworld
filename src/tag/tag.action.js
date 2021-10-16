import { handleResponse, requestGetOptions, BASE_DOMAIN } from '../utility/actions.utils'

const TAG_URL = BASE_DOMAIN+ "tags";
export const LOAD_TABLE_SUCCESS = "TAG_LOAD_TABLE_SUCCESS";
export const NEW_TAG = "TAG_NEW_TAG";


export const loadAllTags = () => {
    return (dispatch, getState) => {
        const token = getState().authentication.token;
        const address = TAG_URL;
        fetch(address, requestGetOptions(token))
            .then(handleResponse)
            .then(response => dispatch(allTagsSuccess(response)))
            .catch((error) => console.error(error));
    }
};

const allTagsSuccess = (data) => {
    return {
        type: LOAD_TABLE_SUCCESS, data
    }
}

export const  addTag = (newTag) =>{
    return{
        type : NEW_TAG, newTag
    }
}