import exampleSaga from './exampleSaga';

function* rootSaga() {
  yield [
    exampleSaga(),
  ];
}

export default rootSaga;
