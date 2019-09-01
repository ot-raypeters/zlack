import {
  USER_CONNECTED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../actions/user';

const INITIAL_STATE = {
  authenticated: false,
  connected: false,
  username: null,
  userId: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_CONNECTED:
      return {
        ...state,
        userId: action.userId,
        connected: true
      };

    case USER_LOGGED_IN:
      return {
        ...state,
        username: action.username,
        authenticated: true
      };

    case USER_LOGGED_OUT:
      return {
        ...state,
        username: null,
        authenticated: false
      };

    default:
      return state;
  }
};
