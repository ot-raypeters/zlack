import ToxicityReporter from '../workers/ToxicityReporter';
import Message from '../models/Message';
import { stoppedTyping } from './threads';

export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const TOXIC_MESSAGE_DETECTED = 'TOXIC_MESSAGE_DETECTED';

export function createMessage(threadId, body) {
  return (dispatch, getState) => {
    const message = Message.create({ threadId, body });
    dispatch({ type: CREATE_MESSAGE, message });
    dispatch(stoppedTyping(threadId));
    return message;
  };
}

export function verifyMessageToxicity(message) {
  return (dispatch) => {
    ToxicityReporter.verify(message)
      .then((results) => {
        const { warnings } = results[0];
        if (!warnings.length) return;
        dispatch({ type: TOXIC_MESSAGE_DETECTED, message, warnings });
      });
  };
}

export function createAndVerifyMessage(threadId, body) {
  return (dispatch) => {
    const message = dispatch(createMessage(threadId, body));
    dispatch(verifyMessageToxicity(message));
  };
}