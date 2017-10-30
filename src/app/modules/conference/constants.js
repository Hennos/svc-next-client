const events = {
  sendData: '@PEER/DATA',

  addClients: '@PEER/CLIENTS',

  addPeer: '@PEER/ADD',
  leavePeer: '@PEER/LEAVE',
  setPeer: '@PEER/SET',
  resetPeer: '@PEER/RESET',

  connect: '@SERVER/CONNECT',
  connectDone: '@SERVER/CONNECTED',
};

const stateKeys = {
  client: 'client',
  users: 'users',
};

export { events, stateKeys };
