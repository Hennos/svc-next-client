import { put } from 'redux-saga/effects';

import { setConnectedPeer } from '../actions';

export default function* flowConnectionMP2P({ connected }) {
  yield put(setConnectedPeer(connected));
}
