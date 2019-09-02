import { updateThreadStatus } from './actions/activity';
import { upsertEntities } from './actions/entities';
import { connect } from './actions/user';
import store from './store';

export const REACTIONS = {
  'connect': socket =>
    store.dispatch(connect(socket.id)),

  'disconnect': socket =>
    window.location.reload(),

  'zlack:thread:message': (socket, message) => {
    const action = upsertEntities('messages', [message]);
    store.dispatch(action);
  },

  'zlack:thread:join': (socket, threadId, user) => {
    const updateUser = upsertEntities('users', [user]);
    store.dispatch(updateUser);

    const updateStatus = updateThreadStatus(threadId, user.uid, 'online');
    store.dispatch(updateStatus);
  },

  'zlack:thread:leave': (socket, threadId, userId) => {
    const action = updateThreadStatus(threadId, userId, null);
    store.dispatch(action);
  },

  'zlack:thread:status': (socket, threadId, userId, status) => {
    const action = updateThreadStatus(threadId, userId, status);
    store.dispatch(action);
  },

  'zlack:message:warning': (socket, threadId, messageId, warnings) => {
    const { messages } = store.getState().entities;
    const message = messages.byId[messageId];

    if (!message) return;

    const messageWithWarnings = { ...message, warnings };
    const action = upsertEntities('messages', [messageWithWarnings]);
    store.dispatch(action);
  }
};
