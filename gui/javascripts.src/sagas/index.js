import usecaseSaga from './usecase';
import trialSaga from './trial';

export default function* rootSaga() {
  yield* usecaseSaga();
  yield* trialSaga();
}
