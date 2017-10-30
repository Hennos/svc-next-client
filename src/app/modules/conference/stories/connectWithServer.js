import { call, take, put, select } from 'redux-saga/effects';
import { events, stateKeys } from '../constants';
import initConnection from '../controllers/initConnection';

const getClient = state => state.conference.get(stateKeys.client);

export default function* createConnection() {
  try {
    const client = yield select(getClient);

    const channel = yield call(initConnection, client, 'http://localhost:3001/');

    for (;;) {
      const action = yield take(channel);
      yield put(action);
    }    
  } catch (error) {
    console.log(error.message);
  }
}
