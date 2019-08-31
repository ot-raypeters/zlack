import { createSelector } from 'reselect';

const getThread = ({ entities, threads }) =>
  entities.threads.byId[threads.selectedThreadId];

const getMessages = ({ entities }) => entities.messages;

export const getSelectedThread = createSelector(
  [getThread, getMessages],
  (selectedThread, messages) => ({
    thread: selectedThread,
    messages: messages.all.filter((message) =>
      (message.threadId === selectedThread.uid))
  })
);

const getSubthread = ({ entities, threads }) =>
  entities.messages.byId[threads.selectedSubthreadId];

export const getSelectedSubthread = createSelector(
  [getSubthread, getMessages],
  (selectedSubthread, messages) => ({
    subthread: selectedSubthread,
    messages: messages.all.filter(({ threadId, uid }) =>
      (uid === selectedSubthread.uid || threadId === selectedSubthread.uid))
  })
);
