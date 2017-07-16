import { startCommand } from './command';
import { API_NAME } from '../consts';

export const GET_ITERATION = 'GET_ITERATION';
export const SET_ITERATION = 'SET_ITERATION';

export const startGetIterationCommand = (projectId, iterationNumber) => (
  startCommand(API_NAME.GET_ITERATION, { projectId, iterationNumber })
);

export const setIteration = (iteration) => ({
  type: SET_ITERATION,
  iteration,
});
