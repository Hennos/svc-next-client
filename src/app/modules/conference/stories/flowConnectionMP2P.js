import { put, take, call, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { events } from '../constants';

import { setConnectedPeer } from '../actions';

function catchGettingStream(connecter) {
  return eventChannel((emit) => {
    connecter.onstream = (stream) => {
      emit(stream);
    };
    return () => {};
  });
}

function setVideoAreaSrc(id, stream) {
  const videoArea = document.getElementById(id);
  videoArea.srcObject = stream;
  return new Promise((resolve) => {
    videoArea.onload(() => {
      resolve();
    });
  });
}

function setLocalStream(connecter) {
  connecter.setMediaStream();
}

function* handleRemoteStream(connecter, area) {
  const channel = yield call(catchGettingStream, connecter);
  const remoteStream = yield take(channel);
  if (!connecter.isInitiator) {
    yield call(setLocalStream, connecter);
  }
  yield call(setVideoAreaSrc, area, remoteStream);
}

export default function* flowConnectionMP2P({ connecter }) {
  const { connected } = yield take(events.connectP2PDone);
  yield put(setConnectedPeer(connected));
  const { id: videoAreaId } = yield take(events.videoAreaReady);
  yield fork(handleRemoteStream, connecter, videoAreaId);
  if (connecter.isInitiator) {
    yield call(setLocalStream, connecter);
  }
}
