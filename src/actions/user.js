export const USER_CONNECTED = 'USER_CONNECTED';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export function connect() {
  return (dispatch) => {
    dispatch({ type: USER_CONNECTED });
  };
}

export function login(user) {
  return (dispatch) => {
    dispatch({ type: USER_LOGGED_IN, user });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_LOGGED_OUT });
  };
}
