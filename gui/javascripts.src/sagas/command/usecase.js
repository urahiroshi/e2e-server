import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import { setUsecase } from '../../actions/usecase';
import Api from '../../apis/usecase';

export function* getUsecaseSaga(
  name, { projectId, usecasePath, offset, lastIterationNumber, limit }
) {
  try {
    const response = yield call(
      Api.get, { projectId, usecasePath, offset, lastIterationNumber, limit }
    );
    const usecase = response.data;
    yield put(setUsecase(usecase));
    yield put(successCommand(name));
  } catch (e) {
    console.log('Get usecase request failed:', e);
    yield put(failCommand(name, 'Get usecase has been failed.'));
  }
}
