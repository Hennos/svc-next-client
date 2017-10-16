import PeerData from './PeerData';
import Channel from './Channel';

const INACTIVE_STATUS = 'inactive';
const ACTIVE_STATUS = 'active';

export default class Transport {
  static create(pattern) {
    return new Transport(pattern);
  }

  constructor(pattern) {
    // region arguments type checks
    const argIsFunction = typeof pattern === 'function';
    if (!argIsFunction) {
      throw new TypeError('Transport => constructor(pattern): pattern is not a function');
    }
    // endregion

    this.pattern = pattern;

    this.status = INACTIVE_STATUS;

    this.connecting = null;
    this.connected = null;

    this.channel = null;
  }

  connect(connecting, connected) {
    // region arguments type checks
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
    // endregion

    if (this.isActive()) {
      throw new Error('Transport => connect(connecting, connected): transport already has active connection');
    }

    this.connecting = PeerData.copy(connecting);
    this.connected = PeerData.copy(connected);

    try {
      const connection = this.pattern(this.connecting, this.connected);
      this.channel = Channel.create(connection);
    } catch (error) {
      throw new Error(`Transport => connect(connecting, connected): ${error.message}`);
    }

    this.status = ACTIVE_STATUS;

    return this;
  }

  disconnect() {
    if (!this.isActive()) {
      return this;
    }

    this.channel.close();
    this.channel = null;

    this.connecting = null;
    this.connected = null;

    this.status = INACTIVE_STATUS;

    return this;
  }

  isActive() {
    return this.status === ACTIVE_STATUS;
  }
}
