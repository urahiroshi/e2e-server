import {
  SET_USECASE,
  SHOW_EDIT_USECASE,
  HIDE_EDIT_USECASE,
} from '../actions/usecase';

const usecase = (state = {}, action) => {
  switch (action.type) {
    case SET_USECASE:
      return Object.assign({}, state, action.usecase);
    case SHOW_EDIT_USECASE:
      return Object.assign({}, state, { isVisible: true });
    case HIDE_EDIT_USECASE:
      return Object.assign({}, state, { isVisible: false });
    default:
      return state;
  }
};

export default usecase;
