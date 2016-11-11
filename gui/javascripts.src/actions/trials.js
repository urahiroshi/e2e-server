export const SET_TRIALS = 'SET_TRIALS';
export const START_TRIAL = 'START_TRIAL';

export const setTrials = (trials) => ({
  type: SET_TRIALS,
  trials,
});

export const startTrial = (usecaseId) => ({
  type: START_TRIAL,
  usecaseId,
});
