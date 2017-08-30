import ModuleFragment from '../ModuleFragment';

describe('AppFragment', () => {
  const producePattern = () => null;
  const invalidProducePattern = 'invalid';

  describe('static create(producePattern)', () => {
    it('should create instance of ModuleFragment', () => {
      const moduleFragment = ModuleFragment.create(producePattern);

      expect(moduleFragment).toBeInstanceOf(ModuleFragment);
    });
    it ('should throw TypeError if producePattern is not a function', () => {
      const createFragmentCaller = () => ModuleFragment.create(invalidProducePattern);

      expect(createFragmentCaller).toThrow(TypeError);
    });
  });

  describe('produce()', () => {
    it('should return produced fragment of module', () => {

    });
  });
});
