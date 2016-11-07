import { combineReducers } from 'redux';
import usecases from './usecases';
import usecase from './usecase';
import newUsecase from './new-usecase';
import modal from './modal';
import trials from './trials';

export default combineReducers({
  usecases,
  usecase,
  newUsecase,
  modal,
  trials,
});
