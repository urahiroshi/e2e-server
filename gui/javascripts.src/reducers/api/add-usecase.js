import {
  ADD_USECASE_INITIALIZED,
  ADD_USECASE_START,
  ADD_USECASE,
  ADD_USECASE_FAILED,
} from '../../actions/usecases';

import { API_STATE } from '../../consts';

const addUsecaseApi = (state = {}, action) => {
  switch (action.type) {
    case ADD_USECASE_INITIALIZED:
      return Object.assign({}, state, { state: API_STATE.INITIALIZED });
    case ADD_USECASE_START:
      return Object.assign({}, state, { state: API_STATE.REQUESTED });
    case ADD_USECASE:
      return Object.assign({}, state, { state: API_STATE.SUCCEEDED });
    case ADD_USECASE_FAILED:
      return Object.assign({}, state, { state: API_STATE.FAILED, error: action.error });
    default:
      return state;
  }
};

export default addUsecaseApi;
