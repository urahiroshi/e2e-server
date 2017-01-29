import { startCommand } from './command';
import { API_NAME } from '../consts';

export const SET_RESULT = 'SET_RESULT';

export const setResult = ({ trialId, result }) => ({
  type: SET_RESULT,
  trialId,
  result,
});

export const startGetResultCommand = (trialId) => (
  startCommand(API_NAME.GET_RESULT, { trialId })
);
