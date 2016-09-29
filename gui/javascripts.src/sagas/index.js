import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';

import Api from '../apis/usecase';
import * as Action from '../actions/usecases';

function* addUsecase(action) {
  const usecase = action.usecase;
  const response = yield call(Api.add, usecase);
  yield put(Action.addUsecase(response.body));
}

export default function* rootSaga() {
  yield fork(takeEvery, Action.ADD_USECASE_START, addUsecase);
}
