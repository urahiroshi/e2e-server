import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { START_COMMAND } from '../../actions/command';
import { API_NAME } from '../../consts';
import {
  getUsecasesSaga, addUsecaseSaga, modifyUsecaseSaga, deleteUsecaseSaga,
} from './usecase';
import { getTrialsSaga, addTrialSaga } from './trial';
import { getResultsSaga } from './result';

const sagaMap = {
  [API_NAME.GET_USECASES]: getUsecasesSaga,
  [API_NAME.ADD_USECASE]: addUsecaseSaga,
  [API_NAME.MODIFY_USECASE]: modifyUsecaseSaga,
  [API_NAME.DELETE_USECASE]: deleteUsecaseSaga,
  [API_NAME.GET_TRIALS]: getTrialsSaga,
  [API_NAME.ADD_TRIAL]: addTrialSaga,
  [API_NAME.GET_RESULTS]: getResultsSaga,
};

function* startCommand(action) {
  yield sagaMap[action.name](action.name, action.params);
}

export default function* () {
  yield fork(takeEvery, START_COMMAND, startCommand);
}
