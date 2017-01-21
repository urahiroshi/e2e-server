import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import { addUsecase, modifyUsecase, deleteUsecase } from '../../actions/usecases';
import { setUsecase } from '../../actions/usecase';
import Api from '../../apis/usecase';

export function* addUsecaseSaga(name, { usecase }) {
  try {
    const response = yield call(Api.add, usecase);
    console.log('response:', response);
    yield put(addUsecase(response.data));
    yield put(successCommand(name));
  } catch (e) {
    console.log('Add usecase request failed:', e);
    yield put(failCommand(name, 'Adding new usecase has been failed.'));
  }
}

export function* modifyUsecaseSaga(name, { usecase, newUsecase }) {
  try {
    const response = yield call(Api.modify, usecase, newUsecase);
    console.log('response:', response);
    yield put(modifyUsecase(newUsecase));
    yield put(setUsecase(newUsecase));
    yield put(successCommand(name));
  } catch (e) {
    console.log('Modify usecase request failed:', e);
    yield put(failCommand(name, 'Modify usecase has been failed.'));
  }
}

export function* deleteUsecaseSaga(name, { usecase }) {
  try {
    const response = yield call(Api.delete, usecase);
    console.log('response:', response);
    yield put(deleteUsecase(usecase));
    yield put(successCommand(name));
  } catch (e) {
    console.log('Delete usecase request failed:', e);
    yield put(failCommand(name, 'Delete usecase has been failed.'));
  }
}
