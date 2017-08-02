import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import { setIteration } from '../../actions/iteration';
import Api from '../../apis/iteration';

export function* getIterationSaga(name, { projectId, iterationNumber }) {
  try {
    const response = yield call(Api.get, { projectId, iterationNumber });
    const iteration = response.data;
    yield put(setIteration(iteration));
    yield put(successCommand(name));
  } catch (e) {
    console.log('Get iteration request failed:', e);
    yield put(failCommand(name, 'Get iteration has been failed.'));
  }
}
