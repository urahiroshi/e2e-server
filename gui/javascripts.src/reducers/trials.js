import {
  SET_TRIALS,
  RESET_TRIALS,
} from '../actions/trials';

const trials = (state = [], action) => {
  switch (action.type) {
    case SET_TRIALS:
      return action.trials;
    case RESET_TRIALS:
      return [];
    default:
      return state;
  }
};

export default trials;
