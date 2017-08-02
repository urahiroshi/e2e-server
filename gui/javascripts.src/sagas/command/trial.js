import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import { setTrial } from '../../actions/trial';
import Api from '../../apis/trial';

export function* getTrialSaga(name, { trialId }) {
  try {
    const response = yield call(Api.get, { trialId });
    const trial = response.data;
    yield put(setTrial(trial));
    yield put(successCommand(name));
  } catch (e) {
    console.log('Get trial request failed:', e);
    yield put(failCommand(name, 'Get trial has been failed.'));
  }
}
