import PeerData from './PeerData';

// todo: Peer устанавливает соединение с использованием полученного объекта транспорта.
// Однако, нет гарантий, что переданный транспорт содержит соединение данного пира к удалённому.
// Следует проверять полученный транспорт на соответствие установленного соединения Peer.

function isConnectedHasValidType(connected) {
  const isArrayOfString = array => array.every(element => (typeof element === 'string'));
  const isValueArrayOfString = value => Array.isArray(value) && isArrayOfString(value);

  const type = typeof connected;

  const typeIsBoolean = type === 'boolean';
  const typeIsString = type === 'string';
  const typeIsArrayOfString = isValueArrayOfString(connected);

  return typeIsBoolean || typeIsString || typeIsArrayOfString;
}

export default class Peer {
  static create(desc) {
    return new Peer(desc);
  }

  constructor(desc) {
    const descIsPeerData = desc instanceof PeerData;
    if (!descIsPeerData) {
      throw new TypeError('Peer => constructor(desc): desc is not an instance of PeerData');
    }

    this.getData = () => PeerData.copy(desc);

    this.connected = false;
  }

  setConnection(connectedPeer, connectedModifier) {
    const firstArgIsPeer = connectedPeer instanceof PeerData;
    if (!firstArgIsPeer) {
      throw new TypeError('Peer => setConnection(connectedPeer, callback): connectedPeer is not an instance of PeerData');
    }
    const secondArgIsFunc = typeof connectedModifier === 'function';
    if (!secondArgIsFunc) {
      throw new TypeError('Peer => setConnection(connectedPeer, connectedModifier): connectedModifier is not a function');
    }

    const currentPeer = this.getData();
    const peersAreEqual = currentPeer.is(connectedPeer);
    if (peersAreEqual) {
      throw new TypeError('Peer => setConnection(connectedPeer, connectedModifier): connected peers must be different');
    }

    try {
      const copyConnected = connected => (!Array.isArray(connected) ? connected : [...connected]);
      const copiedState = copyConnected(this.connected);
      const copiedConnectedPeer = PeerData.copy(connectedPeer);
      const newConnectedState = connectedModifier(copiedState, copiedConnectedPeer, currentPeer);

      if (!isConnectedHasValidType(newConnectedState)) {
        throw new TypeError('connectedModifier return invalid value of connected');
      }

      this.connected = newConnectedState;

      return this;
    } catch (error) {
      throw new Error(`Peer => setConnection(connectedPeer, connectedModifier): ${error.message}`);
    }
  }

  clearConnected() {
    this.connected = false;

    return this;
  }
}
