import {
  select,
  put,
  take,
} from 'redux-saga/effects';

import { events, stateKeys } from '../constants';
import {
  connect,
  authorizeDone,
} from '../actions';

export default function* flowAuthorization({ client }) {
  const isAuthorized = yield select(state => state.conference.get(stateKeys.authorized));
  if (!isAuthorized) {
    yield put(connect(client));
    yield take(events.connectDone);
    yield put(authorizeDone());
  }
}
