import { startCommand } from './command';
import { API_NAME } from '../consts';

export const SET_TRIALS = 'SET_TRIALS';
export const RESET_TRIALS = 'RESET_TRIALS';
export const SET_TRIAL = 'SET_TRIAL';
export const RESET_TRIAL = 'RESET_TRIAL';

export const setTrials = (trials) => ({
  type: SET_TRIALS,
  trials,
});

export const resetTrials = () => ({
  type: RESET_TRIALS,
});

export const startGetTrialsCommand = (usecaseId, length, trialId) => (
  startCommand(API_NAME.GET_TRIALS, { usecaseId, length, selectedTrialId: trialId })
);

export const startAddTrialCommand = (usecaseId) => (
  startCommand(API_NAME.ADD_TRIAL, { usecaseId })
);

export const setTrial = (trial) => ({
  type: SET_TRIAL,
  trial,
});

export const resetTrial = () => ({
  type: RESET_TRIAL,
});
