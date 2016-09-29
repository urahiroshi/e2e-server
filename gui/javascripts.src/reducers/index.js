import { combineReducers } from 'redux';
import usecases from './usecases';
import usecase from './usecase';
import newUsecase from './new-usecase';

export default combineReducers({
  usecases,
  usecase,
  newUsecase,
});
