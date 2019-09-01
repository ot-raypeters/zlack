import Message from '../models/Message';
import { stoppedTyping } from './threads';

export const CREATE_MESSAGE = 'CREATE_MESSAGE';

export function createMessage(threadId, body) {
  return (dispatch, getState) => {
    const message = Message.create({ threadId, body });
    dispatch({ type: CREATE_MESSAGE, message });

    dispatch(stoppedTyping(threadId));
  };
}