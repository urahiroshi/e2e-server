import {
  SET_TRIALS,
  RESET_TRIALS,
  SET_RESULT,
} from '../actions/trials';

const trials = (state = [], action) => {
  switch (action.type) {
    case SET_TRIALS:
      return action.trials;
    case RESET_TRIALS:
      return [];
    case SET_RESULT:
      return state.map((trial) => {
        if (trial.id !== action.trialId) { return trial; }
        return Object.assign({}, trial, { result: action.result });
      });
    default:
      return state;
  }
};

export default trials;
