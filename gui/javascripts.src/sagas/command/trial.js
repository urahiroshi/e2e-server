import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import Api from '../../apis/trial';

export function* addTrialSaga(name, { usecaseId }) {
  try {
    const response = yield call(Api.add, usecaseId);
    console.log('response:', response);
    // TODO: Add Trial
    console.log(response.data);
    yield put(successCommand(name));
  } catch (e) {
    console.log('Add trial request failed:', e);
    yield put(failCommand(name, 'Start trial has been failed.'));
  }
}
