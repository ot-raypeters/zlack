const Message = require('../models/Message');

class BaseBot {
  constructor(app, user) {
    this.app = app;
    this.user = null;
    this.userId = null;
    this.threadId = null;
    this.simulatedTypingDelay = 50;
    this.simulationTimeoutId = null;

    if (user) {
      this.impersonate(user);
    }
  }

  impersonate(user) {
    this.user = user;
    this.userId = user.uid;
    return this;
  }

  join(threadId) {
    if (this.threadId !== threadId) {
      this.leave(this.threadId);
    }

    this.threadId = threadId;
    this.app.joinThread(threadId, this.user);
    return this;
  }

  leave(threadId) {
    this.app.leaveThread(threadId, this.userId);
    return this;
  }

  simulateUserMessage(body) {
    return new Promise((resolve, reject) => {
      this.status('typing');

      // @note scale delay relative to size of message
      const relativeDelay = body.length * this.simulatedTypingDelay;
      clearTimeout(this.simulationTimeoutId);
      this.simulationTimeoutId = setTimeout(() => {
        // @note send message
        this.message(body);

        // @note clear typing status
        this.status('online');

        resolve();
      }, relativeDelay);
    });
  }

  message(body) {
    const { threadId, userId } = this;
    if (threadId && userId) {
      const message = Message.create({ threadId, userId, body });
      this.app.createMessage(threadId, userId, message);
    }

    return this;
  }

  status(status = 'online') {
    const { threadId, userId } = this;

    if (threadId && userId) {
      this.app.updateStatus(threadId, userId, status);
    }

    return this;
  }
}

module.exports = BaseBot;
