import exampleModule from './modules/example';

function* rootSaga() {
  yield [
    exampleModule.narrator(),
  ];
}

export default rootSaga;
