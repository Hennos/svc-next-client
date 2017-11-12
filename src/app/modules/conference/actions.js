import { events } from './constants';

const authorize = client => ({
  type: events.authorize,
  client,
});

const authorizeDone = () => ({
  type: events.authorizeDone,
});

const setClientData = client => ({
  type: events.setClientData,
  client,
});

const connect = client => ({
  type: events.connect,
  client,
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

const connectDone = connection => ({
  type: events.connectDone,
  connection,
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
  authorizeDone,
  setClientData,
  connect,
  connectDone,
  connectPeer,
  setPeer,
  resetPeer,
  sendMessage,
  openConnection,
  getP2PSignal,
  readyP2Pconnection,
  sendMessagePeer,
  askPeerDelay,
  pongPeer,
};
