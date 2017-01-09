import { call, put } from 'redux-saga/effects';

import { successCommand, failCommand } from '../../actions/command';
import {
  addUsecase,
  modifyUsecase,
  setUsecase,
  deleteUsecase,
} from '../../actions/usecases';
import Api from '../../apis/usecase';

// TODO: Modify ui and remove this method.
function convertAction(usecase) {
  const actions = usecase.actions.map((action) => {
    const converted = { type: action.type };
    if (['getText', 'getHtml', 'getScreenshot'].indexOf(action.type) >= 0) {
      converted.name = action.param;
    }
    if (['input', 'select'].indexOf(action.type) >= 0) {
      converted.value = action.param;
    }
    if (action.type !== 'getScreenshot') {
      converted.selectors = [action.selector];
    }
    return converted;
  });
  return Object.assign({}, usecase, { actions });
}

export function* addUsecaseSaga(name, { usecase }) {
  try {
    const response = yield call(Api.add, convertAction(usecase));
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
    const response = yield call(Api.modify, convertAction(usecase), convertAction(newUsecase));
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
