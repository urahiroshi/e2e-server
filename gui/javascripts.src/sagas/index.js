import trialSaga from './trial';
import commandSaga from './command';

export default function* rootSaga() {
  yield* trialSaga();
  yield* commandSaga();
}
