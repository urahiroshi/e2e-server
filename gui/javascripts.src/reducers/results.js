import { SET_RESULTS } from '../actions/results';

const results = (state = null, action) => {
  switch (action.type) {
    case SET_RESULTS:
      return action.results;
    default:
      return state;
  }
};

export default results;
