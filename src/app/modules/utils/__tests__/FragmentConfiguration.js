import FragmentConfiguration from '../FragmentConfiguration';

describe('FragmentConfiguration', () => {
  const correctConfig = {
    type: 'test',
    body: {},
  };
  const configWithoutStringType = {
    body: {},
  };
  const configWithoutBody = {
    type: 'invalid',
  };

  describe('static create(config)', () => {
    it('should return an instance of FragmentConfiguration', () => {
      const fragmentConfiguration = FragmentConfiguration.create(correctConfig);

      expect(fragmentConfiguration).toBeInstanceOf(FragmentConfiguration);
    });
    it ('should throw TypeError if config is not consist type with string value', () => {
      const createConfigurationCaller = () => FragmentConfiguration.create(configWithoutStringType);

      expect(createConfigurationCaller).toThrow(TypeError);
    });
  });

  describe('getType()', () => {
    it('should return type getting with constructor config parameter', () => {
      const fragmentConfiguration = FragmentConfiguration.create(correctConfig);

      const gettingType = fragmentConfiguration.getType();

      expect(gettingType).toBe(correctConfig.type);
    });
  });

  describe('getBody()', () => {
    it('should return body getting with constructor config parameter', () => {
      const fragmentConfiguration = FragmentConfiguration.create(correctConfig);

      const gettingBody = fragmentConfiguration.getBody();

      expect(gettingBody).toEqual(correctConfig.body);
    });
  });
});
