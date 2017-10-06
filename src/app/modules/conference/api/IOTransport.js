import io from 'socket.io-client';
import Transport from '../utils/Transport';

export default class IOTransport extends Transport {
  static create(entry, remote) {
    return new IOTransport(entry, remote);
  }

  createChannel() {
    return super.createChannel(() => {
      const address = this.remote.address;
      try {
        const socket = io(address);
        return {
          send: socket.emit,
          onmessage: socket.on,
          close: socket.close,
        };
      } catch (error) {
        throw new Error(`can't create connection by socket.io with "${address}"`);
      }
    });
  }
}
