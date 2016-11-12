import {
  SET_TRIAL,
  RESET_TRIAL,
} from '../actions/trials';

const trial = (state = {}, action) => {
  switch (action.type) {
    case SET_TRIAL:
      return action.trial;
    case RESET_TRIAL:
      return {};
    default:
      return state;
  }
};

export default trial;
