import Channel from './Channel';
import P2PConnecter from './P2PConnecter';

export default class P2PChannel extends Channel {
  static create(connecter) {
    return new P2PChannel(connecter);
  }

  constructor(connecter) {
    const argIsConnecter = connecter instanceof P2PConnecter;
    if (!argIsConnecter) {
      throw new TypeError('P2PChannel => constructor(connecter): dataChannel is not an instance of P2PConnecter');
    }

    connecter.createDataChannel()
    .then((channel) => {
      super({
        send: channel.send.bind(channel),
        onmessage: channel.onmessage.bind(channel),
        close: channel.close.bind(channel),
      });

      const cbIsFunc = typeof this.onopen === 'function';
      if (cbIsFunc) {
        this.onopen.call(this);
      }
    });
  }
}
