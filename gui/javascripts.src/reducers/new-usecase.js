import {
  SET_NEW_USECASE,
  SHOW_NEW_USECASE,
  HIDE_NEW_USECASE,
} from '../actions/new-usecase';

const initialState = {
  actions: [],
  isVisible: false,
};

const newUsecase = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_USECASE:
      return action.usecase;
    case SHOW_NEW_USECASE:
      return Object.assign({}, state, { isVisible: true });
    case HIDE_NEW_USECASE:
      return Object.assign({}, state, { isVisible: false });
    default:
      return state;
  }
};

export default newUsecase;
