import { startCommand } from './command';
import { API_NAME } from '../consts';

export const SET_RESULTS = 'SET_RESULTS';

export const setResults = ({ results }) => ({
  type: SET_RESULTS,
  results,
});

export const startGetResultsCommand = (trialId) => (
  startCommand(API_NAME.GET_RESULTS, { trialId })
);
