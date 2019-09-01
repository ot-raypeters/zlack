export const USER_CONNECTED = 'USER_CONNECTED';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export function connect(userId) {
  return (dispatch) => {
    dispatch({ type: USER_CONNECTED, userId });
  };
}

export function login(username) {
  return (dispatch) => {
    dispatch({ type: USER_LOGGED_IN, username });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_LOGGED_OUT });
  };
}
