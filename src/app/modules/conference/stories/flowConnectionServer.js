import { call, take, put, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import Transport from '../utils/Transport';
import IOChannel from '../utils/IOChannel';
import PeerData from '../utils/PeerData';

import {
  setClientData,
  setPeer,
  resetPeer,
  connectDone,
} from '../actions';
import { events } from '../constants';

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
        address: 'localhost:3002',
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
      peers.forEach(peer => emit(setPeer(peer)));
    });
    channel.onmessage(events.addPeer, (peer) => {
      emit(setPeer(peer));
    });
    channel.onmessage(events.leavePeer, (peer) => {
      emit(resetPeer(peer));
    });

    return function unsubscribe() {
      transport.disconnect();
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

export default function* flowConnectionServer({ client }) {
  try {
    const transport = yield call(connect, client);
    yield fork(handleIO, transport);
    yield put(setClientData(client));
    yield put(connectDone(transport.channel));
  } catch (error) {
    console.log(error.message);
  }
}
