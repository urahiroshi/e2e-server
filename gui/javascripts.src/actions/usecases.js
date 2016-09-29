export const SET_USECASES = 'SET_USECASES';
export const SET_USECASE = 'SET_USECASE';
export const ADD_USECASE = 'ADD_USECASE';
export const ADD_USECASE_START = 'ADD_USECASE_START';

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

export const addUsecaseStart = (usecase) => ({
  type: ADD_USECASE_START,
  usecase,
});
