import { events } from './constants';

const connect = () => ({
  type: events.connect,
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
  setPeer,
  resetPeer,
};
