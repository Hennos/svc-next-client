import { all } from 'redux-saga/effects';
import modules from './modules';

function* rootSaga() {
  yield all([
    modules.example.saga(),
    modules.conference.saga(),
  ]);
}

export default rootSaga;
