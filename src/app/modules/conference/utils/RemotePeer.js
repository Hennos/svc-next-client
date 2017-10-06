import Peer from './Peer';

export default class RemotePeer extends Peer {
  static create(data) {
    return new RemotePeer(data);
  }

  setConnection(entryPeerData) {
    super.setConnection(entryPeerData, () => {
      const entryName = entryPeerData.name;

      if (entryName === this.connected) {
        return this.connected;
      }

      return entryName;
    });

    return this;
  }
}
