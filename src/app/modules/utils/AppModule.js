import FragmentConfiguration from './FragmentConfiguration';
import createModuleFragment from './createModuleFragment';

export default class AppModule {
  constructor(configs = []) {
    if (!Array.isArray(configs)) {
      throw new TypeError('AppModule => in constructor: configs is not an object');
    }
    this.configurate = () => {
      const moduleEntries = configs.reduce((entries, config, index) => {
        try {
          const fragmentConfig = FragmentConfiguration.create(config);
          const moduleFragment = createModuleFragment(fragmentConfig);
          const entry = moduleFragment.get();
          entries.push(entry);
          return entries;
        } catch (error) {
          console.error(`AppModule => create(config): problem with ${index}-th config in configs`);
          return entries;
        }
      }, []);
      return moduleEntries.reduce((module, [type, fragment]) => {
        return Object.defineProperty(module, type, {
          enumerable: true,
          valie: fragment,
        });
      }, {});
    };
  }

  static create(configs) {
    return new AppModule(configs);
  }
}
