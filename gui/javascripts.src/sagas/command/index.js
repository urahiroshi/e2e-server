import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { START_COMMAND } from '../../actions/command';
import { API_NAME } from '../../consts';
import { getProjectSaga } from './project';
import { getIterationSaga } from './iteration';
import { getUsecaseSaga } from './usecase';
import { getTrialSaga } from './trial';
import { getResultsSaga } from './result';

const sagaMap = {
  [API_NAME.GET_PROJECT]: getProjectSaga,
  [API_NAME.GET_ITERATION]: getIterationSaga,
  [API_NAME.GET_USECASE]: getUsecaseSaga,
  [API_NAME.GET_TRIAL]: getTrialSaga,
  [API_NAME.GET_RESULTS]: getResultsSaga,
};

function* startCommand(action) {
  yield sagaMap[action.name](action.name, action.params);
}

export default function* () {
  yield fork(takeEvery, START_COMMAND, startCommand);
}
