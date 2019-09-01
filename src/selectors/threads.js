import { createSelector } from 'reselect';

const getSelectedThreadId = ({ threads }) =>
  threads.selectedThreadId;

const getSelectedSubthreadId = ({ threads }) =>
  threads.selectedSubthreadId;

const getUserId = ({ auth }) => auth.userId;
const getActivity = ({ activity }) => activity;
const getUsers = ({ entities }) => entities.users;
const getMessages = ({ entities }) => entities.messages;

const getThread = ({ entities, threads }) =>
  entities.threads.byId[threads.selectedThreadId];

const getSubthread = ({ entities, threads }) =>
  entities.messages.byId[threads.selectedSubthreadId];

export const getSelectedThread = createSelector(
  [getSelectedThreadId, getThread, getMessages],
  (threadId, selectedThread, messages) => ({
    thread: selectedThread,
    messages: messages.all.filter((message) =>
      (message.threadId === threadId))
  })
);

export const getSelectedSubthread = createSelector(
  [getSelectedSubthreadId, getSubthread, getMessages],
  (selectedSubthreadId, selectedSubthread, messages) => ({
    subthread: selectedSubthread,
    messages: messages.all.filter(({ threadId, uid }) =>
      (uid === selectedSubthreadId || threadId === selectedSubthreadId))
  })
);

export const getSelectedThreadParticipants = createSelector(
  [getUserId, getSelectedThreadId, getSelectedSubthreadId, getActivity, getUsers],
  (currentUserId, threadId, subthreadId, activity, users) => {
    const threadActivity = activity[threadId] || {};
    const subthreadActivity = activity[subthreadId] || {};
    const activeUserIds = Object.keys(threadActivity);

    return activeUserIds
      .map((userId) => {
        const user = users.byId[userId];

        if (!userId || !user) {
          return false;
        }

        const { username } = user;
        const status = subthreadActivity[userId] || threadActivity[userId];
        return { threadId, userId, username, status };
      })
      .filter(Boolean);
  }
);
