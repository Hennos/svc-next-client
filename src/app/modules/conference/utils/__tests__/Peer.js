import Peer from '../Peer';
import PeerData from '../PeerData';
import Transport from '../Transport';

describe('Peer', () => {
  const name = 'bob';
  const address = 'local';
  const description = {
    name,
    address,
  };
  const peerData = PeerData.create(description);
  const remoteDescription = {
    name: 'mark',
    address: 'remote',
  };
  const remotePeerData = PeerData.create(remoteDescription);
  const callback = (oldState, connectedPeer) => connectedPeer.name;
  const invalidCallback = undefined;

  describe('static create(data)', () => {
    it('should create instance of Peer', () => {
      const peer = Peer.create(peerData);

      expect(peer).toBeInstanceOf(Peer);
    });
    it('should throw TypeError if desc is not an instance of PeerData', () => {
      const createPeerCaller = () => Peer.create(description);

      expect(createPeerCaller).toThrow(TypeError);
    });
    it('should set false value to connected property', () => {
      const peer = Peer.create(peerData);

      const peerConnected = peer.connected;

      expect(peerConnected).toBeFalsy();
    });
  });

  describe('getData()', () => {
    const peer = Peer.create(peerData);

    it('should return instance of PeerData', () => {
      const gettingData = peer.getData();

      expect(gettingData).toBeInstanceOf(PeerData);
    });
    it('returning value should to be equal getting with constructor desc by value', () => {
      const gettingPeerData = peer.getData();

      expect(gettingPeerData).toEqual(peerData);
    });
    it('returning value should not to be equal getting with constructor desc by reference', () => {
      const gettingPeerData = peer.getData();

      expect(gettingPeerData).not.toBe(peerData);
    });
    it('returning values should be independent of each other', () => {
      const gettingByFirstTime = peer.getData();
      const gettingBySecondTime = peer.getData();

      expect(gettingByFirstTime).not.toBe(gettingBySecondTime);
    });
  });

  describe('setConnection(connectedPeer, connectedModifier)', () => {
    const peer = Peer.create(peerData);

    const errorMessage = 'error';
    const callbackWithError = () => {
      throw new Error(errorMessage);
    };
    const checkOrderErrorMessage = 'peers`s order is invalid';
    const checkCorrectPeersOrder = (oldState, connectedPeer, currentPeer) => {
      const peersIsCorrect = peerData.is(currentPeer) && !peerData.is(connectedPeer);
      if (!peersIsCorrect) {
        throw new Error(checkOrderErrorMessage);
      }
      return true;
    };

    afterEach(() => {
      peer.clearConnected();
    });

    it('should set connection by calling getting modifier', () => {
      peer.setConnection(remotePeerData, callback);
    });
    it('should throw TypeError if connectedPeer is not an instance of PeerData', () => {
      const setConnectionCaller = () => peer.setConnection(remoteDescription, callback);

      expect(setConnectionCaller).toThrow(/is not an instance of PeerData/);
    });
    it('should throw TypeError if current Peer`s description and connectedPeer are equal', () => {
      const setConnectionCaller = () => peer.setConnection(peerData, callback);

      expect(setConnectionCaller).toThrow(/must be different/);
    });
    it('should throw TypeError if connectedModifier is not a function', () => {
      const setConnectionCaller = () => peer.setConnection(remotePeerData, invalidCallback);

      expect(setConnectionCaller).toThrow(/is not a function/);
    });
    it('should catch error in connectedModifier', () => {
      const setConnectionCaller = () => peer.setConnection(remotePeerData, callbackWithError);

      expect(setConnectionCaller).toThrow(new RegExp(errorMessage));
    });
    it('should provided peers in connectedModifier in the right order', () => {
      const setConnectionCaller = () => peer.setConnection(remotePeerData, checkCorrectPeersOrder);

      expect(setConnectionCaller).not.toThrow(new RegExp(checkOrderErrorMessage));
    });
  });

  describe('clearConnected()', () => {
    const peer = Peer.create(peerData);
    peer.setConnection(remotePeerData, callback);

    it('should clear connected state', () => {
      peer.clearConnected();

      const connected = peer.connected;

      expect(connected).toBeFalsy();
    });
  });
});
