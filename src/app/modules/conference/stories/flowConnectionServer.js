import { call, take, put, select, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import Transport from '../utils/Transport';
import IOChannel from '../utils/IOChannel';
import PeerData from '../utils/PeerData';

import {
  setPeer,
  resetPeer,
  connectP2P,
} from '../actions';
import { events, stateKeys } from '../constants';

function connect(client) {
  const transport = Transport.create((caller, callee) => IOChannel.create(caller, callee));

  return new Promise((resolve, reject) => {
    try {
      const caller = PeerData.create({
        address: 'local',
        ...client,
      });
      const callee = PeerData.create({
        name: 'server',
        address: 'http://192.168.0.20:3002/',
      });

      transport.connect(caller, callee);

      transport.channel.onmessage('connect', () => {
        transport.channel.send(events.sendPeerData, client);

        resolve(transport);
      });
    } catch (error) {
      transport.disconnect();

      reject(error);
    }
  });
}

function subscribe(transport) {
  const { channel } = transport;

  return eventChannel((emit) => {
    channel.onmessage(events.addClients, (peers) => {
      console.log(peers);
      peers.forEach(peer => emit(setPeer(peer)));
    });
    channel.onmessage(events.addPeer, (peer) => {
      console.log(peer);
      emit(setPeer(peer));
    });
    channel.onmessage(events.leavePeer, (peer) => {
      console.log(`peer ${peer} leave`);
      emit(resetPeer(peer));
    });

    return function unsubscribe() {
      transport.disconnect();
      console.log('socket off');
    };
  });
}

function* read(transport) {
  const channel = yield call(subscribe, transport);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* write(transport) {
  while (true) {
    const { message } = yield take(events.sendMessage);
    transport.channel.send(message.type, message.data);
  }
}

function* handleIO(transport) {
  yield fork(read, transport);
  yield fork(write, transport);
}

export default function* flowConnectionServer() {
  try {
    const client = yield select(state => state.conference.get(stateKeys.client));
    const transport = yield call(connect, client);
    yield fork(handleIO, transport);
    yield put(connectP2P(transport.channel));
  } catch (error) {
    console.log(error.message);
  }
}
