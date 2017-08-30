import { all } from 'redux-saga/effects';
import modules from './modules';

function* rootSaga() {
  yield all([
    modules.example.saga(),
    modules.dataChannel.saga(),
  ]);
}

export default rootSaga;
