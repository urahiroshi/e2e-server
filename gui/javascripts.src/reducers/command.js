import {
  PREPARE_COMMAND,
  START_COMMAND,
  SUCCESS_COMMAND,
  FAIL_COMMAND,
  END_COMMAND,
} from '../actions/command';

import { COMMAND_STATE } from '../consts';

const command = (state = {}, action) => {
  switch (action.type) {
    case PREPARE_COMMAND:
      return Object.assign({}, state, {
        [action.name]: { state: COMMAND_STATE.PREPARED },
      });
    case START_COMMAND:
      return Object.assign({}, state, {
        [action.name]: { state: COMMAND_STATE.REQUESTED },
      });
    case SUCCESS_COMMAND:
      return Object.assign({}, state, {
        [action.name]: { state: COMMAND_STATE.SUCCEEDED },
      });
    case FAIL_COMMAND:
      return Object.assign({}, state, {
        [action.name]: { state: COMMAND_STATE.FAILED, error: action.error },
      });
    case END_COMMAND:
      return Object.assign({}, state, {
        [action.name]: { state: null },
      });
    default:
      return state;
  }
};

export default command;
