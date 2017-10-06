import EntryPeer from '../EntryPeer';
import Peer from '../Peer';
import PeerData from '../PeerData';
import RemotePeer from '../RemotePeer';

describe('EntryPeer', () => {
  const description = {
    name: 'entry',
    address: 'local',
  };
  const peerData = PeerData.create(description);
  const remotePeerName = 'remote';
  const remoteDescription = {
    name: remotePeerName,
    address: 'remote',
  };
  const remotePeerData = PeerData.create(remoteDescription);
  const anotherRemotePeerData = PeerData.create({
    name: 'another',
    address: 'another',
  });

  describe('static create(data)', () => {
    it('should create instance of EntryPeer', () => {
      const peer = EntryPeer.create(peerData);

      expect(peer).toBeInstanceOf(EntryPeer);
    });
    it('result should be instance of Peer supertype', () => {
      const peer = EntryPeer.create(peerData);

      expect(peer).toBeInstanceOf(Peer);
    });
    it('should throw TypeError if data is not an instance of PeerData', () => {
      const creatPeerCaller = () => EntryPeer.create(description);

      expect(creatPeerCaller).toThrow(/is not an instance of PeerData/);
    });
    it('should throw TypeError if address in data is not a "local" value', () => {
      const createPeerCaller = () => EntryPeer.create(remotePeerData);

      expect(createPeerCaller).toThrow(/is not a "local"/);
    });
  });

  describe('setConnection(remotePeer)', () => {
    const isArrayOfString = array => array.every(element => (typeof element === 'string'));
    const isValueArrayOfString = value => Array.isArray(value) && isArrayOfString(value);

    const peer = EntryPeer.create(peerData);

    afterEach(() => {
      peer.clearConnected();
    });

    it('after successful addition connected`s state should be array of string', () => {
      peer.setConnection(remotePeerData);
      const connectedIsArrayOfString = isValueArrayOfString(peer.connected);

      expect(connectedIsArrayOfString).toBeTruthy();
    });
    it('if peers alredy connected connected`s state must remain the same', () => {
      peer.setConnection(remotePeerData);
      const oldConnected = peer.connected;
      peer.setConnection(remotePeerData);
      const connectedAfterRepeatAdding = peer.connected;

      expect(connectedAfterRepeatAdding).toEqual(oldConnected);
    });
    it('should return reference to current peer', () => {
      const result = peer.setConnection(remotePeerData);

      expect(result).toBe(peer);
    });
    it('should add to connected`s state name of getting remote peer', () => {
      peer.setConnection(remotePeerData);
      const stateHasRemoteName = !!peer.connected.find(name => Object.is(name, remotePeerName));

      expect(stateHasRemoteName).toBeTruthy();
    });
    it('should throw TypeError if remotePeer is not an instance of PeerData', () => {
      const setConnectionCaller = () => peer.setConnection(remoteDescription);

      expect(setConnectionCaller).toThrow(/is not an instance of PeerData/);
    });
  });

  describe('unsetConnection(remoteName)', () => {
    const peer = EntryPeer.create(peerData);

    afterEach(() => {
      peer.clearConnected();
    });

    it('should unset peer with getting name from connected if connected with him', () => {
      peer.setConnection(remotePeerData);
      peer.setConnection(anotherRemotePeerData);

      peer.unsetConnection(remotePeerName);
      const isConnectedWithRemote = !!peer.connected.find(peerName => peerName === remotePeerName);

      expect(isConnectedWithRemote).toBeFalsy();
    });
    it('connected`s state must remain the same if peers are not connected', () => {
      const oldConnected = peer.connected;
      peer.unsetConnection(remotePeerName);
      const connectedAfterUnset = peer.connected;

      expect(oldConnected).toEqual(connectedAfterUnset);
    });
    it('result should be reference to current peer', () => {
      peer.setConnection(remotePeerData);

      const result = peer.unsetConnection(remotePeerName);

      expect(result).toBe(peer);
    });
    it('should set false to connected is unset last connection', () => {
      peer.setConnection(remotePeerData);

      peer.unsetConnection(remotePeerName);
      const connected = peer.connected;

      expect(connected).toBeFalsy();
    });
    it('should throw TypeError if remoteName is not a string', () => {
      const unsetConnectionCaller = () => peer.unsetConnection(false);

      expect(unsetConnectionCaller).toThrow(/is not a string/);
    });
  });
});
