import { SET_RESULT } from '../actions/result';

const result = (state = {}, action) => {
  switch (action.type) {
    case SET_RESULT:
      return Object.assign({}, action.result, { trialId: action.trialId });
    default:
      return state;
  }
};

export default result;
