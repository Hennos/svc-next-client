import { put } from 'redux-saga/effects';
import { setCurrentConnectionStatus } from '../actions';

function* createConnection() {
  try {
    yield put(setCurrentConnectionStatus('success'));
  } catch (error) {
    throw error;
  }
}

export default createConnection;
