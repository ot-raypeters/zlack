import { generateUid } from '../utils';

class Message {
  constructor(props) {
    Object.assign(this, props, {
      uid: props.uid || generateUid(),
      created: props.created || Date.now(),
      timezoneOffset: props.timezoneOffset || new Date().getTimezoneOffset(),
    });
  }

  static create(props) {
    return new Message(props);
  }
}

export default Message;