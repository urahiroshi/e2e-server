import {
  SHOW_MODAL,
  HIDE_MODAL,
} from '../actions/modal';

const usecase = (state = {}, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, { name: action.name, isVisible: true });
    case HIDE_MODAL:
      return Object.assign({}, state, { name: action.name, isVisible: false });
    default:
      return state;
  }
};

export default usecase;
