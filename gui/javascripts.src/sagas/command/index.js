import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { START_COMMAND } from '../../actions/command';
import { API_NAME } from '../../consts';
import { addUsecaseSaga, modifyUsecaseSaga, deleteUsecaseSaga } from './usecase';

const sagaMap = {
  [API_NAME.ADD_USECASE]: addUsecaseSaga,
  [API_NAME.MODIFY_USECASE]: modifyUsecaseSaga,
  [API_NAME.DELETE_USECASE]: deleteUsecaseSaga,
};

function* startCommand(action) {
  yield sagaMap[action.name](action.name, action.params);
}

export default function* () {
  yield fork(takeEvery, START_COMMAND, startCommand);
}
