export default class ModuleFragment {
  constructor(pattern) {
    if (pattern.get === undefined) {
      throw new TypeError('ModuleFragment => constructor(pattern): getting pattern must be FragmentPattern');
    }

    this.get = () => pattern.get();
  }

  static create(pattern) {
    return new ModuleFragment(pattern);
  }
}
