import openSocket from 'socket.io-client';

function createSocketConnection(url) {
  return openSocket(url);
}

export default createSocketConnection;
