import AppModule from '../AppModule';

describe('AppModule', () => {
  const configsWithInvalid = [{
    type: 'component',
    body: () => null,
  }, {
    type: 'reducer',
    body: {
      initialState: {
        counter: 0,
      },
      workers: [
        ['SOMEONE_ACTION', state => state],
      ],
    },
  }, {
    type: 'saga',
    body: [],
  }, {
    type: 'invalid',
  }];
  const invalidConfigs = {};
  const configsWithoutInvalid = configsWithInvalid.filter(({ type }) => type !== 'invalid');
  const configsWithoutInvalidFragmentsTypes = configsWithoutInvalid.map(({ type }) => type);

  describe('static create(configs)', () => {
    it('should create instance of AppModule', () => {
      const appModule = AppModule.create(configsWithoutInvalid);

      expect(appModule).toBeInstanceOf(AppModule);
    });
    it('should throw TypeError if configs is not array', () => {
      const createAppModuleCaller = () => AppModule.create(invalidConfigs);

      expect(createAppModuleCaller).toThrow(TypeError);
    });
    it('default configs should be empty array', () => {
      const appModule = AppModule.create();

      const configuratedModule = appModule.configurate();
      const moduleFragmentsTypes = Object.keys(configuratedModule);

      expect(moduleFragmentsTypes).toEqual([]);
    });
  });

  describe('configurate()', () => {
    it('should return object with configurated module fragments', () => {
      const appModule = AppModule.create(configsWithoutInvalid);

      const configuratedModule = appModule.configurate();
      const moduleFragmentsTypes = Object.keys(configuratedModule);

      expect(moduleFragmentsTypes).toEqual(configsWithoutInvalidFragmentsTypes);
    });
    it('should ignore invalid config entry in configs', () => {
      const appModule = AppModule.create(configsWithInvalid);

      const configuratedModule = appModule.configurate();
      const moduleFragmentsTypes = Object.keys(configuratedModule);

      expect(moduleFragmentsTypes).toEqual(configsWithoutInvalidFragmentsTypes);
    });
    it('returning object should consist defined property at fragment type description', () => {
      const appModule = AppModule.create(configsWithoutInvalid);

      const configuratedModule = appModule.configurate();
      const moduleValues = Object.values(configuratedModule);
      const isFragmentsDefinedAsProperties = moduleValues.every(value => value !== undefined);

      expect(isFragmentsDefinedAsProperties).toBeTruthy();
    });
  });
});
