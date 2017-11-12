import { events, stateKeys } from './constants';
import initialState from './state';

function handleSetClientData(state, { client }) {
  return state.set(stateKeys.client, client);
}

function handleAuthorizeDone(state) {
  return state.set(stateKeys.authorized, true);
}

function handleSetPeer(state, { peer: { id, data } }) {
  const users = state.get(stateKeys.users).set(id, data);

  return state.set(stateKeys.users, users);
}

function handleResetPeer(state, { peer: id }) {
  const users = state.get(stateKeys.users).delete(id);

  return state.set(stateKeys.users, users);
}

function handleReadyP2PConnection(state) {
  return state.set(stateKeys.peerConnected, true);
}

const workers = [
  [events.setClientData, handleSetClientData],
  [events.authorizeDone, handleAuthorizeDone],
  [events.setPeer, handleSetPeer],
  [events.resetPeer, handleResetPeer],
  [events.readyP2Pconnection, handleReadyP2PConnection],
];

export default {
  workers,
  initialState,
};
