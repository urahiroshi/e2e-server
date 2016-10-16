export const SET_USECASE = 'SET_USECASE';
export const SHOW_EDIT_USECASE = 'SHOW_EDIT_USECASE';
export const HIDE_EDIT_USECASE = 'HIDE_EDIT_USECASE';

export const setUsecase = (usecase) => ({
  type: SET_USECASE,
  usecase,
});

export const showEditUsecase = () => ({
  type: SHOW_EDIT_USECASE,
});

export const hideEditUsecase = () => ({
  type: HIDE_EDIT_USECASE,
});
