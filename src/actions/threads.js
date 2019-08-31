export const SELECT_THREAD = 'SELECT_THREAD';
export const SELECT_SUBTHREAD = 'SELECT_SUBTHREAD';
export const DESELECT_SUBTHREAD = 'DESELECT_SUBTHREAD';

export function selectThread(threadId) {
  return (dispatch) => {
    dispatch({ type: SELECT_THREAD, threadId });
  };
}

export function selectSubthread(subthreadId) {
  return (dispatch, getState) => {
    const { selectedSubthreadId } = getState().threads;

    if (selectedSubthreadId === subthreadId) {
      return deselectSubthread()(dispatch);
    }

    dispatch({ type: SELECT_SUBTHREAD, subthreadId });
  };
}

export function deselectSubthread() {
  return (dispatch) => {
    dispatch({ type: DESELECT_SUBTHREAD });
  };
}
