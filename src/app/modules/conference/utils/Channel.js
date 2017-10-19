function isValidChannel(channel) {
  const isHasSendMethod = typeof channel.send === 'function';
  const isHasOnmessageMethod = typeof channel.onmessage === 'function';
  const isHasCloseMethod = typeof channel.close === 'function';
  return isHasCloseMethod && isHasOnmessageMethod && isHasSendMethod;
}

export default class Channel {
  static create(connection) {
    return new Channel(connection);
  }

  constructor(connection) {
    const argIsValid = isValidChannel(connection);
    if (!argIsValid) {
      throw new TypeError('Channel => contructor(connection): connection is invalid');
    }

    this.send = connection.send.bind(connection);
    this.onmessage = connection.onmessage.bind(connection);
    this.close = connection.close.bind(connection);
  }
}
