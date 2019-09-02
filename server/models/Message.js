const Utils = require('../utils');
const MESSAGES = require('../fixtures/messages.json');
const BY_THREAD_ID = {};
const BY_ID = {};

class Message {
  constructor(props) {
    // @todo strict enforcement of props
    Object.assign(this, props, {
      uid: props.uid || Utils.generateUid(),
      created: props.created || Date.now(),
      timezoneOffset: props.timezoneOffset || new Date().getTimezoneOffset()
    });
  }

  static create(props) {
    const message = new Message(props);
    Message.indexByThreadId(message);
    Message.indexById(message);
    return message;
  }

  static indexById(message) {
    MESSAGES.push(message);
    BY_ID[message.uid] = message;
  }

  static indexByThreadId(message) {
    BY_THREAD_ID[message.threadId] = BY_THREAD_ID[message.threadId] || [];
    BY_THREAD_ID[message.threadId].push(message);
  }

  static getAll() {
    return Promise.resolve([...MESSAGES]);
  }

  static upsert(messageId, partial) {
    const message = BY_ID[messageId];

    if (message) {
      Object.assign(message, partial);
    }
  }

  static byThreadId(threadId) {
    const response = BY_THREAD_ID[threadId] || [];
    return Promise.resolve(response);
  }

  static byThreadIdWithSubthreads(threadId) {
    const threadMessages = BY_THREAD_ID[threadId] || [];

    const allMessages = threadMessages.reduce((ret, message) => {
      const subthread = BY_THREAD_ID[message.uid];
      return subthread ? ret.concat(subthread) : ret;
    }, threadMessages);

    return Promise.resolve(allMessages);
  }
}

MESSAGES.forEach((message) => {
  Message.indexByThreadId(message);
  Message.indexById(message)
});
module.exports = Message;