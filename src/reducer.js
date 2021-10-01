import { combineReducers } from 'redux';
import authReducer from './authentication/authentication.reducer';
import articleReducer from './article/article.reducer';
import mainpageReducer from './paperbase/mainpage.reducer';
import tagReducer from './tag/tag.reducer'

export default combineReducers({
    authentication: authReducer,
    article : articleReducer,
    mainpage : mainpageReducer,
    tag: tagReducer
})