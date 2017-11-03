import Channel from './Channel';

export default class P2PChannel extends Channel {
  static create(connection) {
    return new P2PChannel(connection);
  }

  constructor(connection) {
    super({
      send: connection.send.bind(connection),
      onmessage: connection.onmessage.bind(connection),
      close: connection.close.bind(connection),
    });
  }
}
