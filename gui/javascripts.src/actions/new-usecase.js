export const SET_NEW_USECASE = 'SET_NEW_USECASE';
export const RESET_NEW_USECASE = 'RESET_NEW_USECASE';
export const SHOW_NEW_USECASE = 'SHOW_NEW_USECASE';
export const HIDE_NEW_USECASE = 'HIDE_NEW_USECASE';

export const setNewUsecase = (usecase) => ({
  type: SET_NEW_USECASE,
  usecase,
});

export const resetNewUsecase = () => ({
  type: RESET_NEW_USECASE,
});

export const showNewUsecase = () => ({
  type: SHOW_NEW_USECASE,
});

export const hideNewUsecase = () => ({
  type: HIDE_NEW_USECASE,
});
