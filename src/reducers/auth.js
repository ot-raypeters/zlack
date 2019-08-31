import {
  USER_CONNECTED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../actions/user';

const INITIAL_STATE = {
  connected: false,
  user: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_CONNECTED:
      return {
        ...state,
        user: {
          username: 'Anonymous'
        }
      };

    case USER_LOGGED_IN:
      return {
        ...state,
        user: action.user,
        authenticated: true
      };

    case USER_LOGGED_OUT:
      return {
        ...state,
        user: null,
        authenticated: false
      };

    default:
      return state;
  }
};
