import { startCommand } from './command';
import { API_NAME } from '../consts';

export const SET_USECASES = 'SET_USECASES';
export const SET_USECASE = 'SET_USECASE';
export const ADD_USECASE = 'ADD_USECASE';
export const MODIFY_USECASE = 'MODIFY_USECASE';
export const DELETE_USECASE = 'DELETE_USECASE';

export const setUsecases = (usecases) => ({
  type: SET_USECASES,
  usecases,
});

export const setUsecase = (usecase) => ({
  type: SET_USECASE,
  usecase,
});

export const addUsecase = (usecase) => ({
  type: ADD_USECASE,
  usecase,
});

export const startAddUsecaseCommand = (usecase) => (
  startCommand(API_NAME.ADD_USECASE, { usecase })
);

export const startModifyUsecaseCommand = (usecase, newUsecase) => (
  startCommand(API_NAME.MODIFY_USECASE, { usecase, newUsecase })
);

export const modifyUsecase = (usecase) => ({
  type: MODIFY_USECASE,
  usecase,
});

export const startDeleteUsecaseCommand = (usecase) => (
  startCommand(API_NAME.DELETE_USECASE, { usecase })
);

export const deleteUsecase = (usecase) => ({
  type: DELETE_USECASE,
  usecase,
});
