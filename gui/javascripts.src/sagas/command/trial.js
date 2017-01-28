import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import { setTrials, setTrial } from '../../actions/trials';
import Api from '../../apis/trial';

export function* getTrialsSaga(name, { usecaseId, length, selectedTrialId }) {
  try {
    const response = yield call(Api.getList, usecaseId, length);
    const trials = response.data;
    yield put(setTrials(trials));
    if (selectedTrialId) {
      const selectedTrial = trials.find((trial) => trial.id === selectedTrialId);
      if (selectedTrial) {
        yield put(setTrial(selectedTrial));
      }
    }
    yield put(successCommand(name));
  } catch (e) {
    console.log('Get trials request failed:', e);
    yield put(failCommand(name, 'Get trials has been failed.'));
  }
}

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
