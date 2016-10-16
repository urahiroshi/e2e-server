import { SET_USECASES, MODIFY_USECASE } from '../actions/usecases';

const usecases = (state = [], action) => {
  switch (action.type) {
    case SET_USECASES:
      return action.usecases;
    case MODIFY_USECASE:
      return state.map((usecase) => {
        if (usecase.key === action.usecase.key) {
          return action.usecase;
        }
        return usecase;
      });
    default:
      return state;
  }
};

export default usecases;
