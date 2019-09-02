const User = require('../models/User');
const Thread = require('../models/Thread');
const Message = require('../models/Message');

class StorageManager {
  static getUsers() {
    return User.getAll();
  }

  static getThreads() {
    return Thread.getAll();
  }

  static getMessages(threadId) {
    return Message.byThreadId(threadId);
  }

  static getThreadAndSubthreadMessages(threadId) {
    return Message.byThreadIdWithSubthreads(threadId);
  }

  static createUser(user) {
    const { uid, username } = user;
    const newUser = User.create({ uid, username });
    return Promise.resolve(newUser);
  }

  static createThread(thread) {
    const { uid, name } = thread;
    const newThread = Thread.create({ uid, name });
    return Promise.resolve(newThread);
  }

  static createMessage(message) {
    const { uid, userId, threadId, body, created, timezoneOffset } = message;
    const newMessage = Message.create({ uid, userId, threadId, body, created, timezoneOffset });
    return Promise.resolve(newMessage);
  }
}

module.exports = StorageManager;
