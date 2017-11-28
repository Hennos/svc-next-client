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
  connecterCreated: '@P2P/CONNECTER',
  openConnection: '@P2P/OPEN_CONNECTION',
  connectP2PDone: '@P2P/CONNECTION_READY',
  setConnectedPeer: '@P2P/SET_CONNECTED',

  sendMessagePeer: '@P2P/SEND_MESSAGE',

  videoAreaReady: '@MP2P/VIDEO_AREA',
  sendRemoteStreamURL: '@MP2P/REMOTE_STREAM_URL',
};

const stateKeys = {
  authorized: 'authorized',
  client: 'client',
  users: 'users',
  connections: 'connections',
};

export { events, stateKeys };
