import { takeEvery } from 'redux-saga';
import { fork, call } from 'redux-saga/effects';

import Api from '../apis/trial';
import { START_TRIAL } from '../actions/trials';

function* startTrial(action) {
  const usecaseId = action.usecaseId;
  const response = yield call(Api.add, usecaseId);
  console.log('response:', response);
  if (response.status === 200) {
    // TODO: Add Trial
    console.log(response.body);
  }
}

export default function* () {
  yield fork(takeEvery, START_TRIAL, startTrial);
}
