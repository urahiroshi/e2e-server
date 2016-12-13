export const SET_RESULT = 'SET_RESULT';
export const RESET_RESULT = 'RESET_RESULT';

export const setResult = (result) => ({
  type: SET_RESULT,
  result,
});

export const resetResult = () => ({
  type: RESET_RESULT,
});
