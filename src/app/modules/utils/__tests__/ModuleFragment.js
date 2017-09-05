import ModuleFragment from '../ModuleFragment';
import FragmentPattern from '../FragmentPattern';

describe('ModuleFragment', () => {
  const type = 'some';
  const fragment = {};
  const correctPattern = FragmentPattern.create(type, fragment);
  const invalidPattern = 'invalid';
  const formedPare = correctPattern.get();

  describe('static create(pattern)', () => {
    it('should create instance of ModuleFragment', () => {
      const moduleFragment = ModuleFragment.create(correctPattern);

      expect(moduleFragment).toBeInstanceOf(ModuleFragment);
    });
    it ('should throw TypeError if pattern is not a FragmentPattern', () => {
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
