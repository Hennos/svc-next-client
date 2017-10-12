import PeerData from './PeerData';
import Channel from './Channel';

const NONE_CHANNEL = null;

const INACTIVE_STATUS = 'inactive';
const ACTIVE_STATUS = 'active';

export default class Transport {
  static create() {
    return new Transport();
  }

  constructor() {
    this.status = INACTIVE_STATUS;

    this.connecting = null;
    this.connected = null;

    this.channel = NONE_CHANNEL;
  }

  connect(connecting, connected) {
    if (this.isActive()) {
      throw new Error('Transport => connect(connecting, connected): transport already has active connection');
    }

    const firstArgIsPeerData = connecting instanceof PeerData;
    if (!firstArgIsPeerData) {
      throw new TypeError('Transport => connect(connecting, connected): connecting is not an instance of PeerData');
    }
    const secondArgIsPeerData = connected instanceof PeerData;
    if (!secondArgIsPeerData) {
      throw new TypeError('Transport => connect(connecting, connected): connected is not an instance of PeerData');
    }
    const argsIsEqual = connecting.is(connected);
    if (argsIsEqual) {
      throw new TypeError('Transport => connect(connecting, connected): getting peers are equal');
    }

    this.connecting = PeerData.copy(connecting);
    this.connected = PeerData.copy(connected);

    this.channel = this.createChannel(connecting, connected, () => ({
      send: () => {},
      onmessage: () => {},
      close: () => {},
    }));

    this.status = ACTIVE_STATUS;

    return this;
  }

  // todo: стоит перенести в конструктор Channel
  createChannel(connecting, connected, pattern) {
    const firstArgIsPeerData = connecting instanceof PeerData;
    if (!firstArgIsPeerData) {
      throw new TypeError('Transport => createChannel(connecting, connected, pattern): connecting is not an instance of PeerData');
    }
    const secondArgIsPeerData = connected instanceof PeerData;
    if (!secondArgIsPeerData) {
      throw new TypeError('Transport => createChannel(connecting, connected, pattern): connected is not an instance of PeerData');
    }
    const argsIsEqual = connecting.is(connected);
    if (argsIsEqual) {
      throw new TypeError('Transport => createChannel(connecting, connected, pattern): getting peers are equal');
    }

    if (typeof pattern !== 'function') {
      throw new TypeError('Transport => createChannel(connecting, connected, pattern): pattern is not a function');
    }

    try {
      return Channel.create(pattern(this.connecting, this.connected));
    } catch (error) {
      throw new TypeError(`Transport => createChannel(connecting, connected, pattern): ${error.message}`);
    }
  }

  disconnect() {
    if (!this.isActive()) {
      return this;
    }

    this.channel.close();
    this.channel = NONE_CHANNEL;

    this.connecting = null;
    this.connected = null;

    this.status = INACTIVE_STATUS;

    return this;
  }

  isActive() {
    return this.status === ACTIVE_STATUS;
  }
}
