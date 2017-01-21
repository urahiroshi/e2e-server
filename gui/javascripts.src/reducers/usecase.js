import { SET_USECASE, RESET_USECASE } from '../actions/usecase';

const initialState = {
  actions: [],
  isLoading: true,
};

const usecase = (state = initialState, action) => {
  switch (action.type) {
    case SET_USECASE:
      return Object.assign({}, state, action.usecase, { isLoading: false });
    case RESET_USECASE:
      return initialState;
    default:
      return state;
  }
};

export default usecase;
