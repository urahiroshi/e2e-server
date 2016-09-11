import { SET_USECASE } from '../actions/usecase';

const usecase = (state = {}, action) => {
  switch (action.type) {
    case SET_USECASE:
      return action.usecase;
    default:
      return state;
  }
};

export default usecase;
