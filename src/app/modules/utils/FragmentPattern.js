export default class FragmentPattern {
  static create(type, produce) {
    if (typeof type !== 'string') {
      throw new TypeError('FragmentPattern => constructor(type, produce): type must be string');
    }
    if (typeof produce !== 'function') {
      throw new TypeError('FragmentPattern => constructor(type, produce): produce must be string');
    }

    return new FragmentPattern(type, produce);
  }

  constructor(type, produce) {
    this.calculate = () => [type, produce()];
  }
}
