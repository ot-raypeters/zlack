import { upsertEntities } from './entities';
import { generateUid } from '../utils';

export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const USER_STARTED_TYPING = 'USER_STARTED_TYPING';
export const USER_STOPPED_TYPING = 'USER_STOPPED_TYPING';

export function createMessage(userId, threadId, body) {
  return (dispatch, getState) => {
    const { username } = getState().auth.user;

    const uid = generateUid();
    const created = Date.now();
    const timezoneOffset = new Date().getTimezoneOffset();
    const message = {
      uid,
      username,
      threadId,
      body,
      created,
      timezoneOffset
    };

    upsertEntities('messages', [message])(dispatch);
  };
}

export function stoppedTyping(userId) {
  return (dispatch) => {
    dispatch({ type: USER_STOPPED_TYPING, userId });
  };
}

let timeoutId;
export function startedTyping(userId) {
  return (dispatch) => {
    dispatch({ type: USER_STARTED_TYPING, userId });

    // @note trigger USER_STOPPED_TYPING 5 seconds after latest activity
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => stoppedTyping(userId)(dispatch), 5000);
  };
}
