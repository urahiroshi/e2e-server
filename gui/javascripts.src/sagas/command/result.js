import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import { setResults } from '../../actions/results';
import Api from '../../apis/result';

export function* getResultsSaga(name, { trialId }) {
  try {
    const response = yield call(Api.getList, trialId);
    const results = response.data;
    yield put(setResults({ trialId, results }));
    yield put(successCommand(name));
  } catch (e) {
    console.log('Get results request failed:', e);
    yield put(failCommand(name, 'Get results has been failed.'));
  }
}
