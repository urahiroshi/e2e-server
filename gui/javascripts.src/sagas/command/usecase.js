import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import { addUsecase } from '../../actions/usecases';
import Api from '../../apis/usecase';

export function* addUsecaseSaga(name, { usecase }) {
  const response = yield call(Api.add, usecase);
  console.log('response:', response);
  if (response.status >= 200 && response.status < 300) {
    yield put(addUsecase(response.data));
    yield put(successCommand(name));
  } else {
    yield put(failCommand(name, 'Adding new usecase has been failed.'));
  }
}
