import Channel from './Channel';

export default class P2PChannel extends Channel {
  static create(connection) {
    return new P2PChannel(connection);
  }

  constructor(connection) {
    const onMessageHandler = (callback) => {
      connection.onmessage = message => callback(message);
    };

    super({
      send: connection.send.bind(connection),
      onmessage: onMessageHandler,
      close: connection.close.bind(connection),
    });
  }
}
