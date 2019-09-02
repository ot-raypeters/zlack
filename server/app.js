const AuthorizationMiddleware = require('./middleware/AuthorizationMiddleware');
const ActivityManager = require('./services/ActivityManager');
const SocketManager = require('./services/SocketManager');
const BotManager = require('./services/BotManager');
const SOCKET_API = require('./api');

class App {
  constructor(io) {
    this.io = io;
  }

  joinThread(threadId, user) {
    const userId = user.uid;
    ActivityManager.joinThread(threadId, userId);
    this.io.emit('zlack:thread:join', threadId, user);
  }

  leaveThread(threadId, userId) {
    ActivityManager.leaveThread(threadId, userId);
    this.io.emit('zlack:thread:leave', threadId, userId);
  }

  createMessage(threadId, userId, message) {
    this.io.emit('zlack:thread:message', message);
  }

  updateStatus(threadId, userId, status) {
    this.io.emit('zlack:thread:status', threadId, userId, status);
  }

  broadcastMessageWarning(threadId, messageId, warnings) {
    this.io.emit('zlack:message:warning', threadId, messageId, warnings);
  }
}

module.exports = (io) => {
  io.use(AuthorizationMiddleware.middleware);

  const app = new App(io);
  io.use((socket, next) => {
    SocketManager.connect(app, socket, SOCKET_API);
    next();
  });

  BotManager.configure(app);

  return new App(io);
};
