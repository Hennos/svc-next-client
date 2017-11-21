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

const connectP2PDone = connected => ({
  type: events.connectP2PDone,
  connected,
});

const setConnectedPeer = connected => ({
  type: events.setConnectedPeer,
  connected,
});

const sendMessagePeer = message => ({
  type: events.sendMessagePeer,
  message,
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
  connectP2PDone,
  setConnectedPeer,
  sendMessagePeer,
};
