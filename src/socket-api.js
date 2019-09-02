import {
  selectThread,
  SELECT_THREAD,
  SELECT_SUBTHREAD,
  DESELECT_THREAD,
  DESELECT_SUBTHREAD,
  USER_STARTED_TYPING,
  USER_STOPPED_TYPING
} from './actions/threads';

import { CREATE_MESSAGE, TOXIC_MESSAGE_DETECTED } from './actions/messages';
import { connect, USER_LOGGED_IN } from './actions/user';
import { upsertEntities } from './actions/entities';
import { syncActivity } from './actions/activity';
import store from './store';

export const API = {
  connect: socket => store.dispatch(connect(socket.id)),

  [USER_LOGGED_IN]: (socket, state, action) => {
    socket.emit('zlack:login', action.username, (response) => {
      store.dispatch(upsertEntities('threads', response.threads));
      store.dispatch(upsertEntities('users', response.users));
      store.dispatch(syncActivity(response.activity));

      // @note auto select first thread when nothing is selected
      if (!state.threads.selectedThreadId) {
        setTimeout(() => {
          const [firstThread] = response.threads;
          store.dispatch(selectThread(firstThread.uid));
        }, 250);
      }
    });
  },

  [SELECT_THREAD]: (socket, state, action) => {
    socket.emit('zlack:thread:join', action.threadId, (response) => {
      const action = upsertEntities('messages', response.messages);
      store.dispatch(action);
    });
  },

  [SELECT_SUBTHREAD]: (socket, state, action) => {
    socket.emit('zlack:thread:join', action.threadId, (response) => {
      const action = upsertEntities('messages', response.messages);
      store.dispatch(action);
    });
  },

  [DESELECT_THREAD]: (socket, state, action) =>
    socket.emit('zlack:thread:leave', action.threadId),

  [DESELECT_SUBTHREAD]: (socket, state, action) =>
    socket.emit('zlack:thread:leave', action.threadId),

  [CREATE_MESSAGE]: (socket, state, action) => {
    const { message } = action;

    socket.emit('zlack:thread:message', message, (response) => {
      const action = upsertEntities('messages', [response.message]);
      store.dispatch(action);
    });
  },

  [USER_STARTED_TYPING]: (socket, state, action) => {
    const { threadId } = action;
    const { userId } = state.auth;
    socket.emit('zlack:thread:status', threadId, userId, 'typing');
  },

  [USER_STOPPED_TYPING]: (socket, state, action) => {
    const { threadId } = action;
    const { userId } = state.auth;
    socket.emit('zlack:thread:status', threadId, userId, 'online');
  },

  [TOXIC_MESSAGE_DETECTED]: (socket, state, action) => {
    const { message, warnings } = action;
    const { uid: messageId, threadId } = message;
    socket.emit('zlack:message:warning', threadId, messageId, warnings);
  }
};