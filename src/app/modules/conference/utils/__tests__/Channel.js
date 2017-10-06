import Channel from '../Channel';

describe('Channel', () => {
  const send = jest.fn();
  const onmessage = jest.fn();
  const close = jest.fn();

  const invalidSend = null;
  const invalidOnmessage = null;
  const invalidClose = null;

  const connection = {
    send,
    onmessage,
    close,
  };
  const connectionWithoutSend = {
    send: invalidSend,
    onmessage,
    close,
  };
  const connectionWithoutOnmessage = {
    send,
    onmessage: invalidOnmessage,
    close,
  };
  const connectionWithoutClose = {
    send,
    onmessage,
    close: invalidClose,
  };

  afterEach(() => {
    send.mockClear();
    onmessage.mockClear();
    close.mockClear();
  });

  describe('static create(connection)', () => {
    it('should return instance of Channel', () => {
      const channel = Channel.create(connection);

      expect(channel).toBeInstanceOf(Channel);
    });
    it('should throw TypeError if connection doesn`t consist send method', () => {
      const createChannelCaller = () => Channel.create(connectionWithoutSend);

      expect(createChannelCaller).toThrow(TypeError);
    });
    it('should throw TypeError if connection doesn`t consist onmessage method', () => {
      const createChannelCaller = () => Channel.create(connectionWithoutOnmessage);

      expect(createChannelCaller).toThrow(TypeError);
    });
    it('should throw TypeError if connection doesn`t consist close method', () => {
      const createChannelCaller = () => Channel.create(connectionWithoutClose);

      expect(createChannelCaller).toThrow(TypeError);
    });

    describe('send()', () => {
      const channel = Channel.create(connection);

      it('should delegate to send method of getting connection', () => {
        channel.send();

        expect(send).toBeCalled();
      });
    });
    describe('onmessage()', () => {
      const channel = Channel.create(connection);

      it('should delegate to onmessage method of getting connection', () => {
        channel.onmessage();

        expect(onmessage).toBeCalled();
      });
    });
    describe('close()', () => {
      const channel = Channel.create(connection);

      it('should delegate to close method of getting connection', () => {
        channel.close();

        expect(close).toBeCalled();
      });
    });
  });
});
