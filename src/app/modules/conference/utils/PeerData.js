export default class PeerData {
  static create(desc) {
    return new PeerData(desc);
  }

  static copy(peerData) {
    const argIsPeerData = peerData instanceof PeerData;
    if (!argIsPeerData) {
      throw new TypeError('PeerData => copy(peerData): peerData is not an instance of PeerData');
    }

    const peerDesc = Object.keys(peerData).reduce((desc, key) => {
      return Object.assign({ [key]: peerData[key] }, desc);
    }, {});
    return PeerData.create(peerDesc);
  }

  constructor(desc) {
    if (typeof desc !== 'object') {
      throw new TypeError('PeerData => constructor(desc): desc is not an object');
    }
    const { name, address } = desc;
    if (typeof name !== 'string') {
      throw new TypeError('PeerData => constructor(desc): name in desc is not a string');
    }
    if (typeof address !== 'string') {
      throw new TypeError('PeerData => constructor(desc): address in desc is not a string');
    }

    Object.keys(desc).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        value: desc[key],
      });
    });
  }

  is(peerData) {
    const argIsPeerData = peerData instanceof PeerData;
    if (!argIsPeerData) {
      throw new TypeError('PeerData => is(peerData): peerData is not an instance of PeerData');
    }

    if (this === peerData) {
      return true;
    }

    const isObjPropEqual = (prop, fObj, sObj) => Object.is(fObj[prop], sObj[prop]);
    const isDataPropEqual = prop => isObjPropEqual(prop, this, peerData);
    const isPropertiesEqual = Object.keys(this).every(isDataPropEqual);

    return isPropertiesEqual;
  }
}
