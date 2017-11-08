import { take, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { events } from '../constants';
import {
  sendMessage,
  sendMessagePeer,
} from '../actions';

export default function* pingPongTask() {
  let counter = 0;
  while (counter !== 500) {
    const currentTime = Date.now();
    yield put(sendMessagePeer({
      type: events.pingPeer,
    }));
    yield take(events.pongPeer);
    const peerDelay = Date.now() - currentTime;
    yield put(sendMessage({
      type: events.pushDelay,
      data: peerDelay,
    }));
    yield call(delay, 500);
    counter += 1;
  }
}
