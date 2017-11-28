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
  const newUser = Immutable.Map(data);
  const updatedUsers = state.get(stateKeys.users).set(id, newUser);
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

function handleRemoteStreamURL(state, { id, url }) {
  const oldUsers = state.get(stateKeys.users);
  const updatedUser = oldUsers
    .get(id)
    .set('url', url);
  const updatedUsers = oldUsers.set(id, updatedUser);
  return state.set(stateKeys.users, updatedUsers);
}

const workers = [
  [events.setClientData, handleSetClientData],
  [events.authorizeDone, handleAuthorizeDone],
  [events.setPeer, handleSetUser],
  [events.resetPeer, handleResetUser],
  [events.setConnectedPeer, handleSetConnectedPeer],
  [events.sendRemoteStreamURL, handleRemoteStreamURL],
];

export default {
  workers,
  initialState,
};
