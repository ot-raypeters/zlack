const MESSAGES = [];

class Message {
  constructor(props) {
    // @todo strict enforcement of props
    Object.assign(this, props);
    MESSAGES.push(this);
  }

  static create(props) {
    return new Message(props);
  }

  static getAll() {
    return Promise.resolve([...MESSAGES]);
  }

  static byThreadId(threadId) {
    const matcher = message => message.threadId === threadId;
    return Promise.resolve(MESSAGES.filter(matcher));
  }
}

module.exports = Message;