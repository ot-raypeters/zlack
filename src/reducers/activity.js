import { SYNC_ACTIVITY, UPSERT_ACTIVITY } from '../actions/activity';

export const upsertThreadActivity = (state, action) => {
  const thread = state[action.threadId] || {};
  const nextState = {
    ...state,
    [action.threadId]: {
      ...thread,
      [action.userId]: action.status
    }
  };

  if (!action.status) {
    delete nextState[action.threadId][action.userId];
  }

  return nextState;
};

export default function (state = {}, action) {
  switch (action.type) {
    case SYNC_ACTIVITY:
      return { ...action.activity };

    case UPSERT_ACTIVITY:
      return upsertThreadActivity(state, action);

    default:
      return state;
  }
};
