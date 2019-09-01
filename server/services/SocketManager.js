class SocketManager {
  static connect(socket, api) {
    Object.keys(api)
      .forEach((eventName) => {
        const eventHandler = api[eventName];
        socket.on(eventName, eventHandler.bind(this, socket));
      });
  }
}

module.exports = SocketManager;