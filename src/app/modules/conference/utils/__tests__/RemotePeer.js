import RemotePeer from '../RemotePeer';
import Peer from '../Peer';
import PeerData from '../PeerData';

describe('RemotePeer', () => {
  const name = 'mark';
  const entryName = 'bob';
  const address = 'remote';
  const entryAddress = 'local';
  const description = {
    name,
    address,
  };
  const peerData = PeerData.create(description);
  const entryPeerData = PeerData.create({
    name: entryName,
    address: entryAddress,
  });

  describe('static create(data)', () => {
    it('should create instance of RemotePeer', () => {
      const peer = RemotePeer.create(peerData);

      expect(peer).toBeInstanceOf(RemotePeer);
    });
    it('created should be isntance of Peer', () => {
      const peer = RemotePeer.create(peerData);

      expect(peer).toBeInstanceOf(Peer);
    });
    it('should throw TypeError if getting data is not an instance of PeerData', () => {
      const createPeerCaller = () => RemotePeer.create(description);

      expect(createPeerCaller).toThrow(/is not an instance of PeerData/);
    });
  });

  describe('setConnection(entryPeerData)', () => {
    const peer = RemotePeer.create(peerData);

    afterEach(() => {
      peer.clearConnected();
    });

    it('after settting connected state should be string', () => {
      peer.setConnection(entryPeerData);
      const resultIsString = typeof peer.connected === 'string';

      expect(resultIsString).toBeTruthy();
    });
    it('if peers alredy connected connected`s state must remain the same', () => {
      peer.setConnection(entryPeerData);
      const oldConnected = peer.connected;
      peer.setConnection(entryPeerData);
      const connectedAfterRepeatAdding = peer.connected;

      expect(connectedAfterRepeatAdding).toEqual(oldConnected);
    });
    it('with success should set entry peer`s name to connected`s state', () => {
      peer.setConnection(entryPeerData);
      const connected = peer.connected;

      expect(connected).toBe(entryName);
    });
  });
});
