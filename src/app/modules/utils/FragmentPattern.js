export default class FragmentPattern {
  static create(type, fragment) {
    if (typeof type !== 'string') {
      throw new TypeError('FragmentPattern => constructor(type, produce): type must be string');
    }
    if (fragment === undefined) {
      throw new TypeError('FragmentPattern => constructor(type, produce): fragment must not be undefined');
    }

    return new FragmentPattern(type, fragment);
  }

  constructor(type, fragment) {
    this.get = () => [type, fragment];
  }
}
