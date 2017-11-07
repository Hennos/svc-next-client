import { take, put } from 'redux-saga/effects';

import { events } from '../constants';
import {
  sendMessagePeer,
} from '../actions';

export default function* pingPongTask() {
  const currentTime = Date.now();
  yield put(sendMessagePeer({
    type: events.pingPeer,
  }));
  yield take(events.pongPeer);
  const delay = Date.now() - currentTime;
  console.log(delay);
}
