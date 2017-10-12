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
    it('should set status`s state to "inactive"', () => {
      const transport = Transport.create();

      expect(transport).toHaveProperty('status', 'inactive');
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

  describe('connect(connecting, connected)', () => {
    let port = Transport.create();

    afterEach(() => {
      port = Transport.create();
    });

    it('should return reference to transport', () => {
      const result = port.connect(firstPeer, secondPeer);

      expect(result).toBe(port);
    });
    it('should connect getting peers and set created channel to channel`s property', () => {
      port.connect(firstPeer, secondPeer);
      const settedChannel = port.channel;

      expect(settedChannel).toBeInstanceOf(Channel);
    });
    it('should set "active" to status`s state in transport after creating connection', () => {
      port.connect(firstPeer, secondPeer);
      const settedStatus = port.status;

      expect(settedStatus).toBe('active');
    });
    it('should set connecting to connecting`s state in transport', () => {
      port.connect(firstPeer, secondPeer);

      const connecting = port.connecting;

      expect(connecting).toEqual(firstPeer);
    });
    it('set connecting shouldn`t to be copy by reference of getting connecting', () => {
      port.connect(firstPeer, secondPeer);

      const connecting = port.connecting;

      expect(connecting).not.toBe(firstPeer);
    });
    it('should set connected to connected`s state in transport', () => {
      port.connect(firstPeer, secondPeer);

      const connected = port.connected;

      expect(connected).toEqual(secondPeer);
    });
    it('set connected shouldn`t to be copy by reference of getting connected', () => {
      port.connect(firstPeer, secondPeer);

      const connected = port.connected;

      expect(connected).not.toBe(secondPeer);
    });
    it('should throw TypeError if connecting is not an instance of PeerData', () => {
      const connectCaller = () => port.connect(invalidPeer, secondPeer);

      expect(connectCaller).toThrow(/is not an instance of PeerData/);
    });
    it('should throw TypeError if connected is not an instance of PeerData', () => {
      const connectCaller = () => port.connect(firstPeer, invalidPeer);

      expect(connectCaller).toThrow(/is not an instance of PeerData/);
    });
    it('should throw TypeError if getting peers are equal', () => {
      const connectCaller = () => port.connect(firstPeer, firstPeer);

      expect(connectCaller).toThrow(/peers are equal/);
    });
    it('should throw Error if transport already has active connection', () => {
      port.connect(firstPeer, secondPeer);
      const connectCaller = () => port.connect(firstPeer, secondPeer);

      expect(connectCaller).toThrow(/already has active connection/);
    });
  });

  describe('createChannel()', () => {
    let port = Transport.create();
    const errorMessage = 'U-ups';
    const cbWithError = () => {
      throw new Error(errorMessage);
    };
    const cbInvalidResult = () => ({
      send: () => null,
      onmessage: () => null,
    });

    afterEach(() => {
      port = Transport.create();
    });

    it('result should be an instance of Channel', () => {
      const createdChannel = port.createChannel(firstPeer, secondPeer, pattern);

      expect(createdChannel).toBeInstanceOf(Channel);
    });
    it('state of transport should remain the same', () => {
      // plain copy
      const copyOfState = Object.assign({}, port);

      port.createChannel(firstPeer, secondPeer, pattern);

      expect(port).toEqual(copyOfState);
    });
    it('should throw TypeError if pattern is not a function', () => {
      const createChannelCaller = () => port.createChannel(firstPeer, secondPeer, invalidPattern);

      expect(createChannelCaller).toThrow(/is not a function/);
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

  describe('disconnect()', () => {
    let port = Transport.create();

    afterEach(() => {
      port = Transport.create();
    });

    it('should return reference to transport', () => {
      port.connect(firstPeer, secondPeer);

      const result = port.disconnect();

      expect(result).toBe(port);
    });
    it('state of transport should remain the same if connection hasn`t created yet', () => {
      // plain copy
      const copyOfState = Object.assign({}, port);

      port.disconnect();

      expect(port).toEqual(copyOfState);
    });
    it('after closing status`s state value should be "inactive"', () => {
      port.connect(firstPeer, secondPeer);

      port.disconnect();

      expect(port).toHaveProperty('status', 'inactive');
    });
    it('after closing connecting`s state value should be null', () => {
      port.connect(firstPeer, secondPeer);

      port.disconnect();

      expect(port).toHaveProperty('connecting', null);
    });
    it('after closing connected`s state value should be null', () => {
      port.connect(firstPeer, secondPeer);

      port.disconnect();

      expect(port).toHaveProperty('connected', null);
    });
    it('after disconnect channel`s state value should be null', () => {
      port.createChannel(firstPeer, secondPeer, pattern);

      port.disconnect();

      expect(port).toHaveProperty('channel', null);
    });
  });

  describe('isActive()', () => {
    const port = Transport.create();

    afterEach(() => {
      port.disconnect();
    });

    it('should return false if connection hasn`t created yet', () => {
      const result = port.isActive();

      expect(result).toBeFalsy();
    });
    it('should return true if connection has created', () => {
      port.connect(firstPeer, secondPeer);

      const result = port.isActive();

      expect(result).toBeTruthy();
    });
  });
});
