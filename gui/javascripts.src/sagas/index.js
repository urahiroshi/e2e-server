import commandSaga from './command';

export default function* rootSaga() {
  yield* commandSaga();
}
