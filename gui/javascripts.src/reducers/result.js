import {
  SET_RESULT,
  RESET_RESULT,
} from '../actions/results';

const result = (state = {}, action) => {
  switch (action.type) {
    case SET_RESULT:
      return action.result;
    case RESET_RESULT:
      return {};
    default:
      return state;
  }
};

export default result;
