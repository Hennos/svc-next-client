import P2PConnecter from './P2PConnecter';
import Channel from './Channel';

export default async function patternDataChannel(connecter) {
  const argIsConnecter = connecter instanceof P2PConnecter;
  if (!argIsConnecter) {
    throw new TypeError('patternDataChannel: connecter is not an instance of P2PConnecter');
  }

  const connection = await connecter.createDataChannel();

  return () => Channel.create(connection);
}
