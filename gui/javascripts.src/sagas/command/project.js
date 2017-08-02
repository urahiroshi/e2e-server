import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import { setProject } from '../../actions/project';
import Api from '../../apis/project';

export function* getProjectSaga(name, { projectId }) {
  try {
    const response = yield call(Api.get, { projectId });
    const project = response.data;
    yield put(setProject(project));
    yield put(successCommand(name));
  } catch (e) {
    console.log('Get project request failed:', e);
    yield put(failCommand(name, 'Get project has been failed.'));
  }
}
