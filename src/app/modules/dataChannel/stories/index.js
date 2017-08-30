import { takeEvery } from 'redux-saga/effects';
import { events } from '../constants';
import createConnection from './createConnection';

function* saga() {
  yield takeEvery(events.createConnection, createConnection);
}

export default saga;
