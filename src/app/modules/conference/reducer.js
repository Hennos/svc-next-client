import Immutable from 'immutable';

import { events, stateKeys } from './constants';
import initialState from './state';

function handleSetClientData(state, { client }) {
  return state.set(stateKeys.client, client);
}

function handleAuthorizeDone(state) {
  return state.set(stateKeys.authorized, true);
}

function handleSetUser(state, { peer: { id, data } }) {
  const updatedUsers = state.get(stateKeys.users).set(id, data);
  return state.set(stateKeys.users, updatedUsers);
}

function handleResetUser(state, { peer: id }) {
  const updatedUsers = state.get(stateKeys.users).delete(id);
  const updatedConnections = state
    .get(stateKeys.connections)
    .filterNot(connected => Object.is(connected, id));
  return state
    .set(stateKeys.users, updatedUsers)
    .set(stateKeys.connections, updatedConnections);
}

function handleSetConnectedPeer(state, { connected }) {
  const updatedConnections = state
    .get(stateKeys.connections)
    .push(connected);
  return state.set(stateKeys.connections, updatedConnections);
}

const workers = [
  [events.setClientData, handleSetClientData],
  [events.authorizeDone, handleAuthorizeDone],
  [events.setPeer, handleSetUser],
  [events.resetPeer, handleResetUser],
  [events.setConnectedPeer, handleSetConnectedPeer],
];

export default {
  workers,
  initialState,
};
