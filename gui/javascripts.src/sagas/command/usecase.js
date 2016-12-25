import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import {
  addUsecase,
  modifyUsecase,
  setUsecase,
  deleteUsecase,
} from '../../actions/usecases';
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

export function* modifyUsecaseSaga(name, { usecase, newUsecase }) {
  const response = yield call(Api.modify, usecase, newUsecase);
  console.log('response:', response);
  if (response.status === 200) {
    yield put(modifyUsecase(newUsecase));
    yield put(setUsecase(newUsecase));
    yield put(successCommand(name));
  } else {
    yield put(failCommand(name, 'Modify usecase has been failed.'));
  }
}

export function* deleteUsecaseSaga(name, { usecase }) {
  const response = yield call(Api.delete, usecase);
  console.log('response:', response);
  if (response.status >= 200) {
    yield put(deleteUsecase(usecase));
    yield put(successCommand(name));
  } else {
    yield put(failCommand(name, 'Delete usecase has been failed.'));
  }
}
