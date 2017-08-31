import ModuleFragment from '../ModuleFragment';

describe('ModuleFragment', () => {
  const type = 'some';
  const produce = () => {};
  const correctPattern = () => [type, produce()];
  const invalidPattern = 'invalid';
  const formedPare = correctPattern();

  describe('static create(pattern)', () => {
    it('should create instance of ModuleFragment', () => {
      const moduleFragment = ModuleFragment.create(correctPattern);

      expect(moduleFragment).toBeInstanceOf(ModuleFragment);
    });
    it ('should throw TypeError if pattern is not a function', () => {
      const createFragmentCaller = () => ModuleFragment.create(invalidPattern);

      expect(createFragmentCaller).toThrow(TypeError);
    });
  });

  describe('get()', () => {
    it('should return pare of fragment type and produced fragment body', () => {
      const moduleFragment = ModuleFragment.create(correctPattern);

      const gettinPare = moduleFragment.get();

      expect(gettinPare).toEqual(formedPare);
    });
  });
});
