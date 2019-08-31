import { SELECT_THREAD, SELECT_SUBTHREAD, DESELECT_SUBTHREAD } from '../actions/threads';

const INITIAL_STATE = {
  selectedThreadId: null,
  selectedSubthreadId: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_THREAD:
      return {
        ...state,
        selectedThreadId: action.threadId
      };

    case SELECT_SUBTHREAD:
      return {
        ...state,
        selectedSubthreadId: action.subthreadId
      };

    case DESELECT_SUBTHREAD:
      return {
        ...state,
        selectedSubthreadId: null
      };

    default:
      return state;
  }
};
