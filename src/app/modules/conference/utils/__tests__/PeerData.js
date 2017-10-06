import PeerData from '../PeerData';

describe('PeerData', () => {
  const peerName = 'any';
  const invalidPeerName = null;
  const peerAddress = 'local';
  const invalidPeerAddress = null;
  const peerDesc = {
    name: peerName,
    address: peerAddress,
  };
  const anotherPeerDesc = {
    name: 'another',
    address: 'another',
  };
  const notObjPeerDesc = [];
  const peerDescWithInvalidName = {
    name: invalidPeerName,
    address: peerAddress,
  };
  const peerDescWithInvalidAddress = {
    name: peerName,
    address: invalidPeerAddress,
  };

  describe('static create(desc)', () => {
    it('should return instance of PeerData', () => {
      const peerData = PeerData.create(peerDesc);

      expect(peerData).toBeInstanceOf(PeerData);
    });
    it('should throw TypeError if desc is not an object', () => {
      const createPeerDataCaller = () => PeerData.create(notObjPeerDesc);

      expect(createPeerDataCaller).toThrow(TypeError);
    });
    it('should throw TypeError if name in desc is not a string', () => {
      const createPeerDataCaller = () => PeerData.create(peerDescWithInvalidName);

      expect(createPeerDataCaller).toThrow(TypeError);
    });
    it('should throw TypeError if address in desc is not a string', () => {
      const createPeerDataCaller = () => PeerData.create(peerDescWithInvalidAddress);

      expect(createPeerDataCaller).toThrow(TypeError);
    });
    it('creating instance of PeerData should consist all propties of getting desc', () => {
      const peerData = PeerData.create(peerDesc);

      const isPeerDataHasProperty = key => Object.prototype.hasOwnProperty.call(peerData, key);
      const isPeerDataHasAllProperties = Object.keys(peerDesc).every(isPeerDataHasProperty);

      expect(isPeerDataHasAllProperties).toBeTruthy();
    });
  });

  describe('static copy(peerData)', () => {
    const peerData = PeerData.create(peerDesc);
    const invalidPeerData = {};
    it('should return instance of PeerData', () => {
      const copiedPeerData = PeerData.copy(peerData);

      expect(copiedPeerData).toBeInstanceOf(PeerData);
    });
    it('should return clear copy of getting peerData', () => {
      const copiedPeerData = PeerData.copy(peerData);

      expect(copiedPeerData).toEqual(peerData);
    });
    it('if copy modified oroginal peerData should remain the same', () => {
      const copiedPeerData = PeerData.copy(peerData);

      copiedPeerData.some = 'any';
      const isPeerDataHasProperty = key => Object.prototype.hasOwnProperty.call(peerData, key);
      const isPeerDataHasNewProperty = isPeerDataHasProperty('some');

      expect(isPeerDataHasNewProperty).toBeFalsy();
    });
    it('should throw TypeError if peerData is not an instance of PeerData', () => {
      const copyPeerDataCaller = () => PeerData.copy(invalidPeerData);

      expect(copyPeerDataCaller).toThrow(TypeError);
    });
  });

  describe('is(peerData)', () => {
    const peerData = PeerData.create(peerDesc);
    const copiedPeerData = PeerData.copy(peerData);
    const anotherPeerData = PeerData.create(anotherPeerDesc);

    it('should return true if current peerData and getting are equal', () => {
      const datesIsEqual = peerData.is(copiedPeerData);

      expect(datesIsEqual).toBeTruthy();
    });
    it('should return false if current peerData and getting are different', () => {
      const datesIsEqual = peerData.is(anotherPeerData);

      expect(datesIsEqual).toBeFalsy();
    });
    it('should throw TypeError if getting peerData is not an instance of PeerData', () => {
      const isPeerCaller = () => peerData.is(anotherPeerDesc);

      expect(isPeerCaller).toThrow(TypeError);
    });
    it('should return true if calling with himself', () => {
      const datesIsEqual = peerData.is(peerData);

      expect(datesIsEqual).toBeTruthy();
    });
  });
});
