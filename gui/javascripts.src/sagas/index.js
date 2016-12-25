import usecaseSaga from './usecase';
import trialSaga from './trial';
import commandSaga from './command';

export default function* rootSaga() {
  yield* usecaseSaga();
  yield* trialSaga();
  yield* commandSaga();
}
