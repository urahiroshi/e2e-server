import { combineReducers } from 'redux';
import project from './project';
import usecase from './usecase';
import trial from './trial';
import results from './results';
import command from './command';
import iteration from './iteration';

export default combineReducers({
  project,
  usecase,
  trial,
  results,
  command,
  iteration,
});
