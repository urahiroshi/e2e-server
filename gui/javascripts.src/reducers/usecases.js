import {
  SET_USECASES,
  ADD_USECASE,
  MODIFY_USECASE,
  DELETE_USECASE,
} from '../actions/usecases';

const usecases = (state = [], action) => {
  switch (action.type) {
    case SET_USECASES:
      return action.usecases;
    case ADD_USECASE:
      return state.concat([action.usecase]);
    case MODIFY_USECASE:
      return state.map((usecase) => {
        if (usecase.id === action.usecase.id) {
          return action.usecase;
        }
        return usecase;
      });
    case DELETE_USECASE:
      return state.filter((usecase) => usecase.id !== action.usecase.id);
    default:
      return state;
  }
};

export default usecases;
