import { SET_RESULTS } from '../actions/results';

const results = (state = [], action) => {
  switch (action.type) {
    case SET_RESULTS:
      return action.results;
    default:
      return state;
  }
};

export default results;
