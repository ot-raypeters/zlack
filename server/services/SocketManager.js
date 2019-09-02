class SocketManager {
  static connect(app, socket, api) {
    Object.keys(api)
      .forEach((eventName) => {
        const eventHandler = api[eventName];
        socket.on(eventName, eventHandler.bind(this, app, socket));
      });
  }
}

module.exports = SocketManager;