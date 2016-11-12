export const SET_TRIALS = 'SET_TRIALS';
export const RESET_TRIALS = 'RESET_TRIALS';
export const START_TRIAL = 'START_TRIAL';
export const SET_TRIAL = 'SET_TRIAL';
export const RESET_TRIAL = 'RESET_TRIAL';

export const setTrials = (trials) => ({
  type: SET_TRIALS,
  trials,
});

export const resetTrials = () => ({
  type: RESET_TRIALS,
});

export const startTrial = (usecaseId) => ({
  type: START_TRIAL,
  usecaseId,
});

export const setTrial = (trial) => ({
  type: SET_TRIAL,
  trial,
});

export const resetTrial = () => ({
  type: RESET_TRIAL,
});
