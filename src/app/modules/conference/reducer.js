import { events, stateKeys } from './constants';
import initialState from './state';

function handleSetPeer(state, { peer: { id, data } }) {
  const users = state.get(stateKeys.users).set(id, data);

  return state.set(stateKeys.users, users);
}

function handleResetPeer(state, { peer: id }) {
  const users = state.get(stateKeys.users).delete(id);

  return state.set(stateKeys.users, users);
}

const workers = [
  [events.setPeer, handleSetPeer],
  [events.resetPeer, handleResetPeer],
];

export default {
  workers,
  initialState,
};
