import {
  PREPARE_COMMAND,
  START_COMMAND,
  SUCCESS_COMMAND,
  FAIL_COMMAND,
  END_COMMAND,
} from '../actions/command';

import { COMMAND_STATE } from '../consts';

const command = (state = {}, action) => {
  const assign = (params) => (
    Object.assign({}, state, {
      [action.name]: Object.assign({ updatedAt: Date.now() }, params),
    })
  );
  switch (action.type) {
    case PREPARE_COMMAND:
      return assign({ state: COMMAND_STATE.PREPARED });
    case START_COMMAND:
      return assign({ state: COMMAND_STATE.REQUESTED });
    case SUCCESS_COMMAND:
      return assign({ state: COMMAND_STATE.SUCCEEDED, succeededAt: Date.now() });
    case FAIL_COMMAND:
      return assign({ state: COMMAND_STATE.FAILED, error: action.error });
    case END_COMMAND:
      return assign({ state: null });
    default:
      return state;
  }
};

export default command;
