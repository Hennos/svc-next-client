import { events } from './constants';

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

export {
  connect,
  connectPeer,
  setPeer,
  resetPeer,
};
