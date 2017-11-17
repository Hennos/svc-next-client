const events = {
  authorize: '@CLIENT/AUTHORIZE',
  authorizeDone: '@CLIENT/AUTHORIZED',
  setClientData: '@CLIENT/SET_DATA',

  sendPeerData: '@PEER/DATA',

  addClients: '@PEER/CLIENTS',

  addPeer: '@PEER/ADD',
  leavePeer: '@PEER/LEAVE',
  setPeer: '@PEER/SET',
  resetPeer: '@PEER/RESET',

  connect: '@SERVER/CONNECT',
  connectDone: '@SERVER/CONNECTED',
  sendMessage: '@SERVER/SEND_MESSAGE',

  msgWebRTC: '@RTC/BASE',
  getP2PSignal: '@RTC/GET_SIGNAL',

  connectPeer: '@P2P/CONNECT_PEER',
  peerConnected: '@P2P/PEERS_CONNECTED',
  openConnection: '@P2P/OPEN_CONNECTION',
  readyP2Pconnection: '@P2P/CONNECTION_READY',
  sendMessagePeer: '@P2P/SEND_MESSAGE',
};

const stateKeys = {
  client: 'client',
  users: 'users',
  peerConnected: 'peerConnected',
  authorized: 'authorized',
};

export { events, stateKeys };
