import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import {
  addUsecase, modifyUsecase, deleteUsecase, setUsecases,
} from '../../actions/usecases';
import { setUsecase, resetUsecase } from '../../actions/usecase';
import Api from '../../apis/usecase';

export function* getUsecasesSaga(name, { selectedUsecaseId }) {
  try {
    const response = yield call(Api.getList);
    const usecases = response.data;
    yield put(setUsecases(usecases));
    if (selectedUsecaseId) {
      const selectedUsecase = usecases.find(
        (usecase) => usecase.id === selectedUsecaseId
      );
      if (selectedUsecase) {
        yield put(setUsecase(selectedUsecase));
      }
    }
    yield put(successCommand(name));
  } catch (e) {
    console.log('Get usecases request failed:', e);
    yield put(failCommand(name, 'Get usecases has been failed.'));
  }
}

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
    yield put(resetUsecase());
    yield put(successCommand(name));
  } catch (e) {
    console.log('Delete usecase request failed:', e);
    yield put(failCommand(name, 'Delete usecase has been failed.'));
  }
}
