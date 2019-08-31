import { createSelector } from 'reselect';

const getThreads = ({ entities }) => entities.threads;
const getMessages = ({ entities }) => entities.messages;

const getSelectedThreadId = ({ threads }) => threads.selectedThreadId;
export const getSelectedThread = createSelector(
  [getSelectedThreadId, getThreads, getMessages],
  (selectedThreadId, threads, messages) => ({
    thread: threads.byId[selectedThreadId],
    messages: messages.all.filter(message => message.threadId === selectedThreadId)
  })
);

const getSelectedSubthreadId = ({ threads }) => threads.selectedSubthreadId;
export const getSelectedSubthread = createSelector(
  [getSelectedSubthreadId, getThreads, getMessages],
  (selectedSubthreadId, threads, messages) => ({
    thread: threads.byId[selectedSubthreadId],
    messages: messages.all.filter(message => message.threadId === selectedSubthreadId)
  })
);
