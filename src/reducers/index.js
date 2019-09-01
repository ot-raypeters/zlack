import { combineReducers } from 'redux';
import activity from './activity';
import entities from './entities';
import threads from './threads';
import auth from './auth';

export default combineReducers({
  activity,
  entities,
  threads,
  auth
});
