import { eventChannel } from 'redux-saga';

import { setPeer, resetPeer } from '../actions';

import Transport from '../utils/Transport';
import IOChannel from '../utils/IOChannel';
import PeerData from '../utils/PeerData';

import { events } from '../constants';

export default function initConnection(client, url) {
  try {
    const peerClient = PeerData.create({
      address: 'local',
      ...client,
    });
    const peerServer = PeerData.create({
      name: 'server',
      address: url,
    });

    return eventChannel((emitter) => {
      const transport = Transport.create((caller, callee) => IOChannel.create(caller, callee));

      transport.connect(peerClient, peerServer);

      const { channel } = transport;

      channel.onmessage('connect', () => {
        channel.send(events.sendData, client);
      });

      channel.onmessage(events.addClients, (peers) => {
        console.log(peers);
        peers.forEach(peer => emitter(setPeer(peer)));
      });
      channel.onmessage(events.addPeer, (peer) => {
        console.log(peer);
        emitter(setPeer(peer));
      });
      channel.onmessage(events.leavePeer, (peer) => {
        console.log(`peer ${peer} leave`);
        emitter(resetPeer(peer));
      });

      return () => {
        transport.disconnect();
        console.log('socket off');
      };
    });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
