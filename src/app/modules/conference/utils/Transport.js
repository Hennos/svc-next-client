import PeerData from './PeerData';
import Channel from './Channel';

const NONE_CHANNEL = null;

export default class Transport {
  static create() {
    return new Transport();
  }

  constructor() {
    this.connecting = null;
    this.connected = null;

    this.channel = NONE_CHANNEL;
  }

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

    if (this.channel !== NONE_CHANNEL) {
      throw new Error('Transport => creatChannel(connecting, connected, pattern): transport`s pattern has already created');
    }

    this.connecting = PeerData.copy(connecting);
    this.connected = PeerData.copy(connected);

    try {
      const createdChannel = pattern(this.connecting, this.connected);

      this.channel = Channel.create(createdChannel);

      return this.channel;
    } catch (error) {
      throw new TypeError(`Transport => createChannel(connecting, connected, pattern): ${error.message}`);
    }
  }

  closeChannel() {
    if (!this.channel) {
      return this;
    }

    this.channel.close();
    this.channel = NONE_CHANNEL;

    return this;
  }

  isActive() {
    return !!this.channel;
  }
}
