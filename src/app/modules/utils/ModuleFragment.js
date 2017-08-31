export default class ModuleFragment {
  constructor(pattern) {
    if (typeof pattern !== 'function') {
      throw new TypeError('ModuleFragment => constructor(): getting pattern must be function');
    }

    this.get = () => pattern();
  }

  static create(pattern) {
    return new ModuleFragment(pattern);
  }
}
