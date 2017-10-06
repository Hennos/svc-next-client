import Peer from './Peer';

export default class EntryPeer extends Peer {
  static create(data) {
    return new EntryPeer(data);
  }

  constructor(data) {
    super(data);

    const peerData = this.getData();
    const addressIsLocal = peerData.address === 'local';
    if (!addressIsLocal) {
      throw new TypeError('EntryPeer => constructor(data): address in getting data is not a "local"');
    }
  }

  setConnection(remotePeerData) {
    super.setConnection(remotePeerData, () => {
      const oldConnectedState = this.connected || [];
      const remoteName = remotePeerData.name;

      const peersIsAlreadyConnected = !!oldConnectedState.find(name => name === remoteName);
      if (peersIsAlreadyConnected) {
        return [...oldConnectedState];
      }

      return [...oldConnectedState, remoteName];
    });

    return this;
  }

  unsetConnection(remoteName) {
    const argIsString = typeof remoteName === 'string';
    if (!argIsString) {
      throw new TypeError('EntryPeer => unsetConnection(remoteName): remoteName is not a string');
    }

    const oldConnected = this.connected;

    if (oldConnected === false) {
      return this;
    }

    let updatedConnected = oldConnected.filter(name => !Object.is(name, remoteName));
    updatedConnected = updatedConnected.length ? updatedConnected : false;

    this.connected = updatedConnected;

    return this;
  }
}
