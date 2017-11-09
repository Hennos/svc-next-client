import { events } from './constants';

const authorize = name => ({
  type: events.authorize,
  name,
});

const connect = () => ({
  type: events.connect,
});

const connectPeer = peer => ({
  type: events.connectPeer,
  peer,
});

const setPeer = peer => ({
  type: events.setPeer,
  peer,
});

const resetPeer = peer => ({
  type: events.resetPeer,
  peer,
});

const sendMessage = message => ({
  type: events.sendMessage,
  message,
});

const connectP2P = signaling => ({
  type: events.connectP2P,
  signaling,
});

const openConnection = () => ({
  type: events.openConnection,
});

const getP2PSignal = signal => ({
  type: events.getP2PSignal,
  signal,
});

const readyP2Pconnection = () => ({
  type: events.readyP2Pconnection,
});

const sendMessagePeer = message => ({
  type: events.sendMessagePeer,
  message,
});

const askPeerDelay = () => ({
  type: events.askPeerDelay,
});

const pongPeer = () => ({
  type: events.pongPeer,
});

export {
  authorize,
  connect,
  connectPeer,
  setPeer,
  resetPeer,
  sendMessage,
  connectP2P,
  openConnection,
  getP2PSignal,
  readyP2Pconnection,
  sendMessagePeer,
  askPeerDelay,
  pongPeer,
};
