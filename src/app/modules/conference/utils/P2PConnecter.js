import Channel from './Channel';

const ICEConfig = {
  iceServers: [{
    url: 'stun:stun.l.google.com:19302',
  }, {
    url: 'stun:stun1.l.google.com:19302',
  }, {
    url: 'stun:stun2.l.google.com:19302',
  }, {
    url: 'stun:stun3.l.google.com:19302',
  }, {
    url: 'stun:stun4.l.google.com:19302',
  }, {
    url: 'turn:numb.viagenie.ca',
    credential: 'muazkh',
    username: 'webrtc@live.com',
  }, {
    url: 'turn:192.158.29.39:3478?transport=udp',
    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    username: '28224511:1379330808',
  }, {
    url: 'turn:192.158.29.39:3478?transport=tcp',
    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    username: '28224511:1379330808',
  }],
};

const msgWebRTC = '@RTC/BASE';

export default class P2PConnecter {
  static create(signaling) {
    return new P2PConnecter(signaling);
  }

  constructor(signaling) {
    // #region type checking
    const argIsChannel = signaling instanceof Channel;
    if (!argIsChannel) {
      throw new TypeError('P2PController => contructor(signaling): signaling is not a Channel');
    }
    // #endregion

    this.isInitiator = false;

    this.connection = null;
    this.peer = null;
    this.channel = null;

    this.onconnect = null;

    this.sendSignal = (type, message = {}) => signaling.send(type, message);
  }

  pushMessage(message) {
    const peer = message.id;

    if (!this.connection) {
      this.createConnection(peer);
    }

    if (message.desc) {
      const desc = message.desc;
      if (desc.type === 'offer') {
        this.connection
        .setRemoteDescription(desc)
        .then(() => this.sendAnswer(peer))
        .catch(this.logError);
      } else {
        this.connection
        .setRemoteDescription(desc)
        .catch(this.logError);
      }
    } else {
      this.connection
      .addIceCandidate(message.candidate)
      .catch(this.logError);
    }
  }

  createConnection(peer, initiator = false) {
    // #region type checking
    const firstArgIsString = typeof peer === 'string';
    if (!firstArgIsString) {
      throw new TypeError('P2PConnecter => createConnection(peer): peer is not a string');
    }
    const secondArgIsBool = typeof initiator === 'boolean';
    if (!secondArgIsBool) {
      throw new TypeError('P2PConnecter => createConnection(peer): initiator is not a boolean');
    }
    // #endregion

    if (this.connection != null) {
      return false;
    }

    this.peer = peer;
    this.isInitiator = initiator;

    this.connection = new RTCPeerConnection(ICEConfig);
    this.connection.onicecandidate = (evt) => {
      console.log('icecandidate event: ', evt);

      if (evt.candidate) {
        this.sendSignal(msgWebRTC, {
          id: this.peer,
          candidate: evt.candidate,
        });
      }
    };
    this.connection.onnegotiationneeded = () => {
      this.connection.createOffer()
      .then(offer => this.connection.setLocalDescription(offer))
      .then(() => this.sendSignal(msgWebRTC, {
        id: this.peer,
        desc: this.connection.localDescription,
      }))
      .catch(this.logError);
    };

    console.log(`Created RTCPeerConnection for ${peer}`);

    if (typeof this.onconnect === 'function') {
      this.onconnect();
    }

    return true;
  }

  createDataChannel() {
    if (this.connection === null) {
      throw new Error('P2PConnecter => createDataChannel(): connection should be created before calling method');
    }

    return new Promise((resolve, reject) => {
      try {
        if (this.isInitiator) {
          this.channel = this.connection.createDataChannel('chat');
          this.channel.onopen = () => {
            resolve(this.channel);
          };
        } else {
          this.connection.ondatachannel = (evt) => {
            this.channel = evt.channel;
            resolve(this.channel);
          };
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  sendAnswer(peer) {
    this.connection.createAnswer()
      .then(answer => this.connection.setLocalDescription(answer))
      .then(() => this.sendSignal(msgWebRTC, {
        id: peer,
        desc: this.connection.localDescription,
      }))
      .catch(this.logError);
  }

  logError(error) {
    console.log(`${error.name}: ${error.message}`);
    throw error;
  }
}
