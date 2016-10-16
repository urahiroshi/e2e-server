import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';

import Api from '../apis/usecase';
import * as Action from '../actions/usecases';

function* addUsecase(action) {
  const usecase = action.usecase;
  const response = yield call(Api.add, usecase);
  console.log('response:', response);
  if (response.status === 200) {
    yield put(Action.addUsecase(response.body));
  }
}

function* modifyUsecase(action) {
  const usecase = action.usecase;
  const newUsecase = action.newUsecase;
  const response = yield call(Api.modify, usecase, newUsecase);
  console.log('response:', response);
  if (response.status === 200) {
    yield put(Action.modifyUsecase(action.newUsecase));
    yield put(Action.setUsecase(action.newUsecase));
  }
}

function* deleteUsecase(action) {
  const usecase = action.usecase;
  const response = yield call(Api.delete, usecase);
  console.log('response:', response);
  if (response.status >= 200) {
    yield put(Action.deleteUsecase(usecase));
  }
}

export default function* rootSaga() {
  yield fork(takeEvery, Action.ADD_USECASE_START, addUsecase);
  yield fork(takeEvery, Action.MODIFY_USECASE_START, modifyUsecase);
  yield fork(takeEvery, Action.DELETE_USECASE_START, deleteUsecase);
}
