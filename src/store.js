import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { syncMiddleware } from './socket';

const middleware = applyMiddleware(thunk, logger, syncMiddleware);
const store = createStore(rootReducer, middleware);
export default store;
