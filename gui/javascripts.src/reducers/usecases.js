import { SET_USECASES } from '../actions/usecases';

const usecases = (state = [], action) => {
  switch (action.type) {
    case SET_USECASES:
      return action.usecases;
    default:
      return state;
  }
};

export default usecases;
