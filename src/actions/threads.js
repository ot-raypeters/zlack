export const SELECT_THREAD = 'SELECT_THREAD';
export const DESELECT_THREAD = 'DESELECT_THREAD';
export const SELECT_SUBTHREAD = 'SELECT_SUBTHREAD';
export const DESELECT_SUBTHREAD = 'DESELECT_SUBTHREAD';

export function selectThread(threadId) {
  return (dispatch, getState) => {
    const { selectedThreadId } = getState().threads;

    if (selectedThreadId) {
      if (threadId === selectedThreadId) {
        return;
      }

      // @note deselect last thread before selecting the new one
      dispatch(deselectThread(selectedThreadId));
    }

    dispatch({ type: SELECT_THREAD, threadId });
  };
}

export function deselectThread(threadId) {
  return (dispatch) => {
    dispatch({ type: DESELECT_THREAD, threadId });
  };
}

export function selectSubthread(threadId) {
  return (dispatch, getState) => {
    const { selectedSubthreadId } = getState().threads;

    if (selectedSubthreadId === threadId) {
      return deselectSubthread()(dispatch, getState);
    }

    dispatch({ type: SELECT_SUBTHREAD, threadId });
  };
}

export function deselectSubthread() {
  return (dispatch, getState) => {
    const { selectedSubthreadId: threadId } = getState().threads;
    dispatch({ type: DESELECT_SUBTHREAD, threadId });
  };
}

export const USER_STARTED_TYPING = 'USER_STARTED_TYPING';
export const USER_STOPPED_TYPING = 'USER_STOPPED_TYPING';

export function stoppedTyping(threadId) {
  return (dispatch) => {
    dispatch({ type: USER_STOPPED_TYPING, threadId });
  };
}

let timeoutId;
export function startedTyping(threadId) {
  return (dispatch, getState) => {
    dispatch({ type: USER_STARTED_TYPING, threadId });

    // @note trigger USER_STOPPED_TYPING 5 seconds after latest activity
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => dispatch(stoppedTyping(threadId)), 3000);
  };
}
