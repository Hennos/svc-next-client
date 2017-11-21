import { take, fork, call, put, race, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import P2PConnecter from '../utils/P2PConnecter';
import Transport from '../utils/Transport';
import P2PChannel from '../utils/P2PChannel';
import PeerData from '../utils/PeerData';

import { events, stateKeys } from '../constants';
import {
  connectP2PDone,
  getP2PSignal,
} from '../actions';

/* todo: переписать createTransport, создание соединения - логика соединения должна быть
         абстрагирована от от механизма передачи сообщений серверу, механизм передачи
         должен быть передан в качестве стратегии и основан механизме передачи соответсвующих
         action, описанный в таске, управляющей связью с сервером
*/

// #region common api
function subscribe(channel, pattern) {
  return eventChannel(emit => pattern(emit));
}

function* read(evtChannel) {
  while (true) {
    const action = yield take(evtChannel);
    yield put(action);
  }
}
// #endregion

// #region signaling flow
function subscribeSignaling(signaling) {
  return subscribe(signaling, (emit) => {
    signaling.onmessage(events.msgWebRTC, (message) => {
      emit(getP2PSignal(message));
    });

    return () => {};
  });
}

function* listenSignaling(signaling) {
  const channel = yield call(subscribeSignaling, signaling);
  yield fork(read, channel);
}
// #endregion

// #region p2p connection flow
function createConnecter(signaling) {
  return P2PConnecter.create(signaling);
}

function initP2PConnection(connecter, peer) {
  connecter.createConnection(peer, true);
}

function* openP2PConnection(connecter) {
  const { connection } = yield race({
    connection: take(events.connectPeer),
    cancel: take(events.openConnection),
  });

  if (connection) {
    yield call(initP2PConnection, connecter, connection.peer);
  }
}

function handleP2PSignal(connecter, signal) {
  connecter.pushMessage(signal);
}

function* manageMessageP2PConnection(connecter) {
  while(true) {
    const { signal } = yield take(events.getP2PSignal);
    yield call(handleP2PSignal, connecter, signal);
  }
}

function catchCreateConnection(connecter) {
  return new Promise((resolve) => {
    connecter.onconnect = () => {
      resolve();
    };
  });
}

async function connect(client, connecter) {
  const dataChannel = await connecter.createDataChannel();
  const transport = Transport.create(() => P2PChannel.create(dataChannel));

  const caller = PeerData.create({
    address: 'local',
    ...client,
  });
  const callee = PeerData.create({
    name: connecter.peer,
    address: connecter.peer,
  });
  transport.connect(caller, callee);

  return transport;
}

function subscribeP2PConnection(transport) {
  const { channel } = transport;

  return subscribe(channel, (emit) => {
    channel.onmessage((event) => {
      const { type } = JSON.parse(event.data);
      switch (type) {
        // Add message handlers with concrete type
        default:
          break;
      }
    });

    return function unsubscribe() {
      transport.disconnect();
    };
  });
}

function* readP2PConnection(transport) {
  const channel = yield call(subscribeP2PConnection, transport);
  yield fork(read, channel);
}

function* writeP2PConnection(transport) {
  while (true) {
    const { message } = yield take(events.sendMessagePeer);
    transport.channel.send(JSON.stringify(message));
  }
}

function* handleIOConnection(transport) {
  yield fork(readP2PConnection, transport);
  yield fork(writeP2PConnection, transport);
}

function* openDataChannelConnection(connecter) {
  const client = yield select(state => state.conference.get(stateKeys.client));
  const transport = yield call(connect, client, connecter);
  yield fork(handleIOConnection, transport);
  yield put(connectP2PDone(connecter.peer));
}

function* manageP2PConnection(signaling) {
  const connecter = yield call(createConnecter, signaling);
  yield fork(openP2PConnection, connecter);
  yield fork(manageMessageP2PConnection, connecter);
  yield call(catchCreateConnection, connecter);
  yield call(openDataChannelConnection, connecter);
}
// #endregion

export default function* flowConnectionP2P({ connection: signaling }) {
  yield fork(listenSignaling, signaling);
  yield fork(manageP2PConnection, signaling);
}
