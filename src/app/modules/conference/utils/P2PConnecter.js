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
  constructor(initiator, signaling) {
    // #region type checking
    const fArgIsBool = typeof initiator === 'boolean';
    if (!fArgIsBool) {
      throw new TypeError('P2PController => contructor(signaling): initiator is not a boolean');
    }
    const sArgIsChannel = signaling instanceof Channel;
    if (!sArgIsChannel) {
      throw new TypeError('P2PController => contructor(signaling): signaling is not a Channel');
    }
    // #endregion

    this.isInitiator = initiator;

    this.connection = null;
    this.peer = null;
    this.channel = null;

    signaling.onmessage(msgWebRTC, this.handleMessage);

    this.sendSignal = (type, message = {}) => signaling.send(type, JSON.stringify(message));
  }

  handleMessage(message) {
    const data = JSON.parse(message);
    const peer = data.id;

    if (!this.connection) {
      this.createConnection(peer);
    }

    if (data.desc) {
      const desc = data.desc;
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
      .addIceCandidate(data.candidate)
      .catch(this.logError);
    }
  }

  createConnection(peer) {
    // #region type checking
    const argIsString = typeof peer === 'string';
    if (!argIsString) {
      throw new TypeError('P2PConnecter => createConnection(peer): peer is not a string');
    }
    // #endregion

    if (this.connection != null) {
      throw new Error(`P2PConnecter => createConnection(peer): is already connected with ${this.peer}`);
    }

    this.connection = new RTCPeerConnection(ICEConfig);
    this.connection.onicecandidate = (evt) => {
      console.log('icecandidate event: ', evt);

      if (evt.candidate) {
        this.sendSignal(msgWebRTC, {
          peer,
          candidate: evt.candidate,
        });
      }
    };
    this.connection.onnegotiationneeded = () => {
      this.connection.createOffer()
      .then(offer => this.connection.setLocalDescription(offer))
      .then(() => this.sendSignal(msgWebRTC, {
        peer,
        desc: this.connection.localDescription,
      }))
      .catch(this.logError);
    };

    console.log(`Created RTCPeerConnection for ${peer}`);
  }

  createDataChannel() {
    if (this.connection === null) {
      throw new Error('P2PConnecter => createDataChannel(): connection should be created before calling method');
    }

    return new Promise((resolve, reject) => {
      try {
        if (this.isInitiator) {
          this.channel = this.connection.createDataChannel('chat');
          this.channel.onopen(() => {
            resolve(this.channel);
          });
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
        peer,
        desc: this.connection.localDescription,
      }))
      .catch(this.logError);
  }

  logError(error) {
    console.log(`${error.name}: ${error.message}`);
    throw error;
  }
}