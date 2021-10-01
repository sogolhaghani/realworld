import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import reducers from './reducer';

const middleware = applyMiddleware( thunk,logger);

const store = createStore(reducers, middleware);

export default store;