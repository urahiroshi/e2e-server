export const SET_USECASES = 'SET_USECASES';
export const SET_USECASE = 'SET_USECASE';

export const setUsecases = (usecases) => ({
  type: SET_USECASES,
  usecases,
});

export const setUsecase = (usecase) => ({
  type: SET_USECASE,
  usecase,
});
