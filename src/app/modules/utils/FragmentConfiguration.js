export default class FragmentConfiguration {
  constructor({ type, body }) {
    if (typeof type !== 'string') {
      throw new TypeError('FragmentConfiguration: type must to be string');
    }

    this.getType = () => type;
    this.getBody = () => body;
  }

  static create(config) {
    return new FragmentConfiguration(config);
  }
}
