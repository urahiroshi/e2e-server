import { startCommand } from './command';
import { API_NAME } from '../consts';

export const GET_TRIAL = 'GET_TRIAL';
export const SET_TRIAL = 'SET_TRIAL';

export const startGetTrialCommand = (trialId) => (
  startCommand(API_NAME.GET_TRIAL, { trialId })
);

export const setTrial = (trial) => ({
  type: SET_TRIAL,
  trial,
});
