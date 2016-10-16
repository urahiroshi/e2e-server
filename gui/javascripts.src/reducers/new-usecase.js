import {
  SET_NEW_USECASE,
  RESET_NEW_USECASE,
} from '../actions/new-usecase';

const initialState = {
  actions: [],
  isLoading: true,
};

const newUsecase = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_USECASE:
      return Object.assign({}, state, action.usecase, { isLoading: false });
    case RESET_NEW_USECASE:
      return initialState;
    default:
      return state;
  }
};

export default newUsecase;
