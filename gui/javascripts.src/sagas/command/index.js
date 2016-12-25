import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { START_COMMAND } from '../../actions/command';
import { API_NAME } from '../../consts';
import { addUsecaseSaga } from './usecase';

const sagaMap = {
  [API_NAME.ADD_USECASE]: addUsecaseSaga,
};

function* startCommand(action) {
  yield sagaMap[action.name](action.name, action.params);
}

export default function* () {
  yield fork(takeEvery, START_COMMAND, startCommand);
}
