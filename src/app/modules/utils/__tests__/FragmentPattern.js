import FragmentPattern from '../FragmentPattern';

describe('FragmentPattern', () => {
  const correctType = 'type';
  const correctFragment = {};
  const formedPare = [correctType, correctFragment];
  const invalidType = correctFragment;
  const invalidFragment = undefined;

  describe('static create(type, produce)', () => {
    it('return instance of FragmentPattern', () => {
      const fragmentPattern = FragmentPattern.create(correctType, correctFragment);

      expect(fragmentPattern).toBeInstanceOf(FragmentPattern);
    });
    it('should throw TypeError if type argument is not a string', () => {
      const createPatternCaller = () => FragmentPattern.create(invalidType, correctFragment);

      expect(createPatternCaller).toThrow(TypeError);
    });
    it('should throw TypeError if produce undefined', () => {
      const createPatternCaller = () => FragmentPattern.create(correctType, invalidFragment);

      expect(createPatternCaller).toThrow(TypeError);
    });
  });

  describe('get()', () => {
    it('should return pare of type and produced fragment body', () => {
      const fragmentPattern = FragmentPattern.create(correctType, correctFragment);

      const creatingPare = fragmentPattern.get();

      expect(creatingPare).toEqual(formedPare);
    });
  });
});
