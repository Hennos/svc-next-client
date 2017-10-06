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

  createChannel(connecting, connected, callback) {
    const firstArgIsPeerData = connecting instanceof PeerData;
    if (!firstArgIsPeerData) {
      throw new TypeError('Transport => createChannel(connecting, connected, callback): connecting is not an instance of PeerData');
    }
    const secondArgIsPeerData = connected instanceof PeerData;
    if (!secondArgIsPeerData) {
      throw new TypeError('Transport => createChannel(connecting, connected, callback): connected is not an instance of PeerData');
    }
    const argsIsEqual = connecting.is(connected);
    if (argsIsEqual) {
      throw new TypeError('Transport => createChannel(connecting, connected, callback): getting peers are equal');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('Transport => createChannel(connecting, connected, callback): callback is not a function');
    }

    if (this.channel !== NONE_CHANNEL) {
      throw new Error('Transport => creatChannel(connecting, connected, callback): transport`s channel has already created');
    }

    this.connecting = PeerData.copy(connecting);
    this.connected = PeerData.copy(connected);

    try {
      const createdChannel = callback(this.connecting, this.connected);

      this.channel = Channel.create(createdChannel);

      return this.channel;
    } catch (error) {
      throw new TypeError(`Transport => createChannel(callback): ${error.message}`);
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
