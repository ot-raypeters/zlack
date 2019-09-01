import io from 'socket.io-client';
import { REACTIONS } from './socket-reactions';
import { API } from './socket-api';

const socket = io();

Object.keys(REACTIONS)
  .forEach((eventName) => {
    const reaction = REACTIONS[eventName];
    socket.on(eventName, reaction.bind(this, socket));
  });

export function syncMiddleware(store) {
  return (next) => (action) => {
    const socketHandler = API[action.type];

    if (socketHandler) {
      const state = store.getState();
      socketHandler(socket, state, action);
    }

    next(action);
  };
}

export default socket;
