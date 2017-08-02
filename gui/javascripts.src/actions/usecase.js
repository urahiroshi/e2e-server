import { startCommand } from './command';
import { API_NAME } from '../consts';

export const GET_USECASE = 'GET_USECASE';
export const SET_USECASE = 'SET_USECASE';

export const startGetUsecaseCommand = (
  projectId, usecasePath, { offset, lastIterationNumber, limit }
) => (
  startCommand(
    API_NAME.GET_USECASE,
    { projectId, usecasePath, offset, lastIterationNumber, limit }
  )
);

export const setUsecase = (usecase) => ({
  type: SET_USECASE,
  usecase,
});
