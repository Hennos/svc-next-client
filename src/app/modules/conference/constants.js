const events = {
  sendPeerData: '@PEER/DATA',

  addClients: '@PEER/CLIENTS',

  addPeer: '@PEER/ADD',
  leavePeer: '@PEER/LEAVE',
  setPeer: '@PEER/SET',
  resetPeer: '@PEER/RESET',

  connect: '@SERVER/CONNECT',
  connectDone: '@SERVER/CONNECTED',
  sendMessage: '@SERVER/MESSAGE',
};

const stateKeys = {
  client: 'client',
  users: 'users',
};

export { events, stateKeys };
