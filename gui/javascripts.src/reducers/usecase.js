import {
  SET_USECASE,
} from '../actions/usecase';

const initialState = {
  actions: [],
  isLoading: true,
};

const usecase = (state = initialState, action) => {
  switch (action.type) {
    case SET_USECASE:
      return Object.assign({}, state, action.usecase, { isLoading: false });
    default:
      return state;
  }
};

export default usecase;
