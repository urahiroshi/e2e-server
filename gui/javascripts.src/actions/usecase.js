export const SET_USECASE = 'SET_USECASE';
export const RESET_USECASE = 'RESET_USECASE';

export const setUsecase = (usecase) => ({
  type: SET_USECASE,
  usecase,
});

export const resetUsecase = () => ({
  type: RESET_USECASE,
});
