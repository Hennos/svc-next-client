import { put, take, call, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { events } from '../constants';

import {
  setConnectedPeer,
  sendRemoteStreamURL,
} from '../actions';

function catchGettingStream(connecter) {
  return eventChannel((emit) => {
    connecter.onstream = (stream) => {
      emit(stream);
    };
    return () => {};
  });
}

function createRemoteStreamURL(stream) {
  const remoteStreamURL = URL.createObjectURL(stream);
  return remoteStreamURL;
}

function setLocalStream(connecter) {
  connecter.setMediaStream();
}

function* handleRemoteStream(connecter) {
  const channel = yield call(catchGettingStream, connecter);
  const remoteStream = yield take(channel);
  if (!connecter.isInitiator) {
    yield call(setLocalStream, connecter);
  }
  const remoteStreamURL = yield call(createRemoteStreamURL, remoteStream);
  yield put(sendRemoteStreamURL(connecter.peer, remoteStreamURL));
}

export default function* flowConnectionMP2P({ connecter }) {
  const { connected } = yield take(events.connectP2PDone);
  yield put(setConnectedPeer(connected));
  yield fork(handleRemoteStream, connecter);
  if (connecter.isInitiator) {
    yield call(setLocalStream, connecter);
  }
}
