import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import Api from '../../apis/trial';

export function* addTrialSaga(name, { usecaseId }) {
  const response = yield call(Api.add, usecaseId);
  console.log('response:', response);
  if (response.status >= 200 && response.status < 300) {
    // TODO: Add Trial
    console.log(response.data);
    yield put(successCommand(name));
  } else {
    yield put(failCommand(name, 'Start trial has been failed.'));
  }
}
