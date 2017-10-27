import IOChannel from '../IOChannel';
import Channel from '../Channel';

describe('IOChannel', () => {
  const connecting = {
    name: 'mark',
    address: 'local',
  };
  const connected = {
    name: 'bob',
    address: 'http://localhost:3000/',
  };

  describe('static create(connecting, connected)', () => {
    it('should create socket.io channel without problem with valid parameter', () => {
      const createChannelCaller = () => IOChannel.create(connecting, connected);

      expect(createChannelCaller).not.toThrow();
    });
    it('should create instance of IOChannel', () => {
      const channel = IOChannel.create(connecting, connected);

      expect(channel).toBeInstanceOf(IOChannel);
    });
    it('creating instance if IOChannel should be subtype of Channel', () => {
      const channel = IOChannel.create(connecting, connected);

      expect(channel).toBeInstanceOf(Channel);
    });
    it('created channel should be working', (done) => {
      const channel = IOChannel.create(connecting, connected);

      channel.onmessage('connect', () => {
        channel.send('test connection');
      });
      channel.onmessage('connection working', () => {
        done();
      });
    });
  });
});
