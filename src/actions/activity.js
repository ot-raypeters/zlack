export const SYNC_ACTIVITY = 'SYNC_ACTIVITY';
export const UPSERT_ACTIVITY = 'UPDATE_THREAD_STATUS';

export function syncActivity(activity) {
  return (dispatch) => {
    dispatch({ type: SYNC_ACTIVITY, activity });
  };
}

export function updateThreadStatus(threadId, userId, status) {
  return (dispatch) => {
    dispatch({ type: UPSERT_ACTIVITY, threadId, userId, status });
  };
}