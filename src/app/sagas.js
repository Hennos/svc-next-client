import { all } from 'redux-saga/effects';
import modules from './modules';

function* rootSaga() {
  yield all([
    modules.example.narrator(),
    modules.dataChannel.narrator(),
  ]);
}

export default rootSaga;
