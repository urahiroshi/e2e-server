export const SET_USECASES = 'SET_USECASES';
export const SET_USECASE = 'SET_USECASE';
export const ADD_USECASE = 'ADD_USECASE';
export const ADD_USECASE_START = 'ADD_USECASE_START';
export const MODIFY_USECASE_START = 'MODIFY_USECASE_START';
export const MODIFY_USECASE = 'MODIFY_USECASE';
export const DELETE_USECASE_START = 'DELETE_USECASE_START';
export const DELETE_USECASE = 'DELETE_USECASE';
export const ADD_USECASE_INITIALIZED = 'ADD_USECASE_INITIALIZED';
export const ADD_USECASE_FAILED = 'ADD_USECASE_FAILED';

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

export const addUsecaseInitialized = () => ({
  type: ADD_USECASE_INITIALIZED,
});

export const addUsecaseStart = (usecase) => ({
  type: ADD_USECASE_START,
  usecase,
});

export const addUsecaseFailed = (error) => ({
  type: ADD_USECASE_FAILED,
  error,
});

export const modifyUsecaseStart = (usecase, newUsecase) => ({
  type: MODIFY_USECASE_START,
  usecase,
  newUsecase,
});

export const modifyUsecase = (usecase) => ({
  type: MODIFY_USECASE,
  usecase,
});

export const deleteUsecaseStart = (usecase) => ({
  type: DELETE_USECASE_START,
  usecase,
});

export const deleteUsecase = (usecase) => ({
  type: DELETE_USECASE,
  usecase,
});
