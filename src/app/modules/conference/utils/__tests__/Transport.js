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
  const pattern = () => Channel.create({
    send: () => null,
    onmessage: () => null,
    close: () => null,
  });
  const invalidPattern = undefined;

  describe('static create(pattern)', () => {
    it('should create instance of Transport', () => {
      const transport = Transport.create(pattern);

      expect(transport).toBeInstanceOf(Transport);
    });
    it('should set status`s state to "inactive"', () => {
      const transport = Transport.create(pattern);

      expect(transport).toHaveProperty('status', 'inactive');
    });
    it('should set pattern to pattern`s state', () => {
      const transport = Transport.create(pattern);

      const settedPattern = transport.pattern;

      expect(settedPattern).toEqual(pattern);
    });
    it('should set connecting`s state to null', () => {
      const transport = Transport.create(pattern);

      expect(transport).toHaveProperty('connecting', null);
    });
    it('should set connected`s state to null', () => {
      const transport = Transport.create(pattern);

      expect(transport).toHaveProperty('connected', null);
    });
    it('should set channel to null value', () => {
      const transport = Transport.create(pattern);

      expect(transport).toHaveProperty('channel', null);
    });
    it('should throw TypeError if pattern is not a function', () => {
      const createTransportCaller = () => Transport.create(invalidPattern);

      expect(createTransportCaller).toThrow(/is not a function/);
    });
  });

  describe('connect(connecting, connected)', () => {
    let port = Transport.create(pattern);

    afterEach(() => {
      port = Transport.create(pattern);
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

  describe('disconnect()', () => {
    let port = Transport.create(pattern);

    afterEach(() => {
      port = Transport.create(pattern);
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
      port.connect(firstPeer, secondPeer);

      port.disconnect();

      expect(port).toHaveProperty('channel', null);
    });
  });

  describe('isActive()', () => {
    const port = Transport.create(pattern);

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
