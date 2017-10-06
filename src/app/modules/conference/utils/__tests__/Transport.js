import Transport from '../Transport';
import PeerData from '../PeerData';
import Channel from '../Channel';

describe('Transport', () => {
  const firstPeer = PeerData.create({
    name: 'bob',
    address: 'local',
  });
  const secondPeer = PeerData.create({
    name: 'mark',
    address: 'remote',
  });
  const invalidPeer = {
    name: 'bob',
    address: 'local',
  };
  const pattern = () => ({
    send: () => null,
    onmessage: () => null,
    close: () => null,
  });
  const invalidPattern = undefined;

  describe('static create()', () => {
    it('should create instance of Transport', () => {
      const transport = Transport.create();

      expect(transport).toBeInstanceOf(Transport);
    });
    it('should set connecting`s state to null', () => {
      const transport = Transport.create();

      expect(transport).toHaveProperty('connecting', null);
    });
    it('should set connected`s state to null', () => {
      const transport = Transport.create();

      expect(transport).toHaveProperty('connected', null);
    });
    it ('should set channel to null value', () => {
      const transport = Transport.create(firstPeer, secondPeer);

      expect(transport).toHaveProperty('channel', null);
    });
  });

  describe('createChannel(connecting, connected, pattern)', () => {
    const port = Transport.create();
    const errorMessage = 'U-ups';
    const cbWithError = () => {
      throw new Error(errorMessage);
    };
    const cbInvalidResult = () => ({
      send: () => null,
      onmessage: () => null,
    });

    afterEach(() => {
      port.closeChannel();
    });

    it('result should be an instance of Channel', () => {
      const createdChannel = port.createChannel(firstPeer, secondPeer, pattern);

      expect(createdChannel).toBeInstanceOf(Channel);
    });
    it('should set created channel to channel`s property', () => {
      const createdChannel = port.createChannel(firstPeer, secondPeer, pattern);
      const settedChannel = port.channel;

      expect(createdChannel).toBe(settedChannel);
    });
    it('should throw TypeError if connecting is not an isntance of PeerData', () => {
      const createChannelCaller = () => port.createChannel(invalidPeer, secondPeer, pattern);

      expect(createChannelCaller).toThrow(/is not an instance of PeerData/);
    });
    it('should throw TypeError if connected is not an instance of PeerData', () => {
      const createChannelCaller = () => port.createChannel(firstPeer, invalidPeer, pattern);

      expect(createChannelCaller).toThrow(/is not an instance of PeerData/);
    });
    it('should throw TypeError if getting peers are equal', () => {
      const createChannelCaller = () => port.createChannel(firstPeer, firstPeer, pattern);

      expect(createChannelCaller).toThrow(/peers are equal/);
    });
    it('should throw TypeError if pattern is not a function', () => {
      const createChannelCaller = () => port.createChannel(firstPeer, secondPeer, invalidPattern);

      expect(createChannelCaller).toThrow(/is not a function/);
    });
    it('should throw error if transport already has created channel', () => {
      port.createChannel(firstPeer, secondPeer, pattern);

      const createChannelCaller = () => port.createChannel(firstPeer, secondPeer, pattern);

      expect(createChannelCaller).toThrow(/already created/);
    });
    it('should catch error throwing by pattern', () => {
      const createChannelCaller = () => port.createChannel(firstPeer, secondPeer, cbWithError);

      expect(createChannelCaller).toThrow(new RegExp(errorMessage));
    });
    it('should throw error if returning by pattern result not a Channel-liked interface', () => {
      const createChannelCaller = () => port.createChannel(firstPeer, secondPeer, cbInvalidResult);

      expect(createChannelCaller).toThrow(Error);
    });
  });

  describe('closeChannel()', () => {
    const port = Transport.create();

    it('channel`s state remain the same if channel is not created yet', () => {
      const oldChannelPropertyValue = port.channel;
      port.closeChannel();
      const newChannelPropertyValue = port.channel;

      expect(oldChannelPropertyValue).toEqual(newChannelPropertyValue);
    });
    it('after closing channel`s state value should be null', () => {
      port.createChannel(firstPeer, secondPeer, pattern);

      port.closeChannel();
      const updatedChannelProperty = port.channel;

      expect(updatedChannelProperty).toBeNull();
    });
    it('should return reference to transport instance if closeChannel calling on transport without created channel', () => {
      const returningValue = port.closeChannel();

      expect(returningValue).toBe(port);
    });
    it('should return reference to transport instance if closeChannel calling on transport with created channel', () => {
      port.createChannel(firstPeer, secondPeer, pattern);

      const returningValue = port.closeChannel();

      expect(returningValue).toBe(port);
    });
  });

  describe('isActive()', () => {
    const port = Transport.create();

    afterEach(() => {
      port.closeChannel();
    });

    it('should return false if channel not yet created', () => {
      const result = port.isActive();

      expect(result).toBeFalsy();
    });
    it('should return true if channel created', () => {
      port.createChannel(firstPeer, secondPeer, pattern);

      const result = port.isActive();

      expect(result).toBeTruthy();
    });
  });
});
