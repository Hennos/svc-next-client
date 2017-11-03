import io from 'socket.io-client';
import Channel from './Channel';

export default class IOChannel extends Channel {
  static create(connecting, connected) {
    return new IOChannel(connecting, connected);
  }

  constructor(connecting, connected) {
    const address = connected.address;

    const socket = io(address, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    super({
      send: socket.emit.bind(socket),
      onmessage: socket.on.bind(socket),
      close: socket.close.bind(socket),
    });
  }
}
