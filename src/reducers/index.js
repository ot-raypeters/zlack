import { combineReducers } from 'redux';
import entities from './entities';
import threads from './threads';
import auth from './auth';

export default combineReducers({
  entities,
  threads,
  auth
});
