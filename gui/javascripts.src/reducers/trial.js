import {
  SET_TRIAL,
} from '../actions/trial';

const trial = (state = null, action) => {
  switch (action.type) {
    case SET_TRIAL:
      return action.trial;
    default:
      return state;
  }
};

export default trial;
