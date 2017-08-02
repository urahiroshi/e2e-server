import {
  SET_ITERATION,
} from '../actions/iteration';

const iteration = (state = null, action) => {
  switch (action.type) {
    case SET_ITERATION:
      return action.iteration;
    default:
      return state;
  }
};

export default iteration;
