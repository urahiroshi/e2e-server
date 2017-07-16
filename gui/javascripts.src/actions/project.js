import { startCommand } from './command';
import { API_NAME } from '../consts';

export const GET_PROJECT = 'GET_PROJECT';
export const SET_PROJECT = 'SET_PROJECT';

export const startGetProjectCommand = (projectId) => (
  startCommand(API_NAME.GET_PROJECT, { projectId })
);

export const setProject = (project) => ({
  type: SET_PROJECT,
  project,
});
