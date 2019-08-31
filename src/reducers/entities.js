import { combineReducers } from 'redux';
import messages from './entities/messages';
import threads from './entities/threads';
import users from './entities/users';

export default combineReducers({
  users,
  threads,
  messages
});