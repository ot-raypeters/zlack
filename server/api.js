const SocketManager = require('./services/SocketManager');
const StorageManager = require('./services/StorageManager');
const ChatActivity = require('./services/ChatActivity').create();

module.exports = (io) => {
  const SOCKET_API = {
    disconnecting: (socket) => {
      if (!socket.threads) return;

      // @note clean up user activity
      const userId = socket.id;
      ChatActivity.clearUserActivity(userId);

      socket.threads.forEach((threadId) => {
        socket.to(`thread-${threadId}`)
          .emit('zlack:thread:leave', threadId, userId);
      });
    },

    'zlack:login': (socket, username, done) => {
      const uid = socket.id;

      // @note create new user
      StorageManager.createUser({ uid, username })
        .then((user) => {
          socket.user = user;

          // @note return critical information
          Promise.all([
            StorageManager.getUsers(),
            StorageManager.getThreads()
          ]).then(([users, threads]) => {
            const activity = ChatActivity.getThreadActivity();
            done({ activity, users, threads });
          });
        });
    },

    'zlack:thread:join': (socket, threadId, done) => {
      // @note update thread activity
      const userId = socket.id;
      ChatActivity.joinThread(userId, threadId);

      socket.threads = socket.threads || [];
      socket.threads.push(threadId);

      // @note broadcast to other clients
      const threadName = `thread-${threadId}`;

      socket.join(threadName, () => {
        socket.emit('zlack:thread:join', threadId, socket.user);

        socket
          .to(threadName)
          .emit('zlack:thread:join', threadId, socket.user);
      });

      // @note return thread messages
      StorageManager.getMessages(threadId)
        .then((messages) => {
          done({ messages });
        });
    },

    'zlack:thread:leave': (socket, threadId) => {
      // @note update thread activity
      const userId = socket.id;
      ChatActivity.leaveThread(userId, threadId);

      // @note broadcast to other clients
      socket.emit('zlack:thread:leave', threadId, userId);

      const threadName = `thread-${threadId}`;
      socket.to(threadName)
        .emit('zlack:thread:leave', threadId, userId);

      socket.leave(threadName);
    },

    'zlack:thread:message': (socket, message, done) => {
      const userId = socket.id;

      // @note create message
      const threadName = `thread-${message.threadId}`;
      StorageManager.createMessage({ ...message, userId })
        .then((message) => {
          // @note broadcast to other clients
          socket.to(threadName)
            .emit('zlack:thread:message', message);

          done({ message });
        });
    },

    'zlack:thread:status': (socket, threadId, userId, status) => {
      socket.emit('zlack:thread:status', threadId, userId, status);

      const threadName = `thread-${threadId}`;
      socket.to(threadName)
        .emit('zlack:thread:status', threadId, userId, status);
    }
  };

  io.use((socket, next) => {
    SocketManager.connect(socket, SOCKET_API);
    next();
  });
};
