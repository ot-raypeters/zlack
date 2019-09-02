const StorageManager = require('./services/StorageManager');
const ActivityManager = require('./services/ActivityManager');

module.exports = {
  'zlack:login': (app, socket, username, done) => {
    const uid = socket.id;

    StorageManager.createUser({ uid, username })
      .then((user) => {
        socket.user = user;

        Promise.all([
          StorageManager.getUsers(),
          StorageManager.getThreads()
        ]).then(([users, threads]) => {
          const activity = ActivityManager.getThreadActivity();
          done({ activity, users, threads });
        });
      });
  },

  'zlack:thread:join': (app, socket, threadId, done) => {
    socket.threads = socket.threads || [];
    socket.threads.push(threadId);

    app.joinThread(threadId, socket.user);

    StorageManager.getThreadAndSubthreadMessages(threadId)
      .then((messages) => {
        done({ messages });
      });
  },

  'zlack:thread:leave': (app, socket, threadId) => {
    const userId = socket.user.uid;
    app.leaveThread(threadId, userId);
  },

  'zlack:thread:message': (app, socket, message, done) => {
    const userId = socket.user.uid;

    StorageManager.createMessage({ ...message, userId })
      .then((message) => {
        const { threadId, userId } = message;
        app.createMessage(threadId, userId, message);
        done({ message });
      });
  },

  'zlack:thread:status': (app, socket, threadId, userId, status) =>
    app.updateStatus(threadId, userId, status),

  disconnecting: (app, socket) => {
    if (!socket.user) return;
    if (!socket.threads) return;

    const userId = socket.user.uid;
    socket.threads.forEach(threadId =>
      app.leaveThread(threadId, userId));
  }
};