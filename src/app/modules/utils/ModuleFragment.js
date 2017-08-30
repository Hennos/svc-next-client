export default class ModuleFragment {
  constructor(producePattern) {
    if (typeof producePattern !== 'function') {
      throw new TypeError('ModuleFragment: producePattern must be function');
    }

    this.produce = () => producePattern();
  }

  static create(producePattern) {
    return new ModuleFragment(producePattern);
  }
}
