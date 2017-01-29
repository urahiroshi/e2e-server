import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import { setResult } from '../../actions/result';
import Api from '../../apis/result';

export function* getResultSaga(name, { trialId }) {
  try {
    const response = yield call(Api.getList, trialId);
    const result = response.data[0];
    yield put(setResult({ trialId, result }));
    yield put(successCommand(name));
  } catch (e) {
    console.log('Get usecases request failed:', e);
    yield put(failCommand(name, 'Get usecases has been failed.'));
  }
}
