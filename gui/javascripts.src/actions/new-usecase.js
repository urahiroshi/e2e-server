export const SET_NEW_USECASE = 'SET_NEW_USECASE';
export const RESET_NEW_USECASE = 'RESET_NEW_USECASE';

export const setNewUsecase = (usecase) => ({
  type: SET_NEW_USECASE,
  usecase,
});

export const resetNewUsecase = () => ({
  type: RESET_NEW_USECASE,
});
