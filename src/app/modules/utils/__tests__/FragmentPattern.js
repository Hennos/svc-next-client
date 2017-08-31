import FragmentPattern from '../FragmentPattern';

describe('FragmentPattern', () => {
  const correctType = 'type';
  const correctProduce = () => null;
  const formedPare = [correctType, correctProduce()];
  const invalidType = correctProduce;
  const invalidProduce = correctType;

  describe('static create(type, produce)', () => {
    it('return instance of FragmentPattern', () => {
      const fragmentPattern = FragmentPattern.create(correctType, correctProduce);
    
      expect(fragmentPattern).toBeInstanceOf(FragmentPattern);
    });
    it('should throw TypeError if type argument is not a string', () => {
      const createPatternCaller = () => FragmentPattern.create(invalidType, correctProduce);

      expect(createPatternCaller).toThrow(TypeError);
    });
    it('should throw TypeError if produce argumment is not a function', () => {
      const createPatternCaller = () => FragmentPattern.create(correctType, invalidProduce);

      expect(createPatternCaller).toThrow(TypeError);
    });
  });

  describe('calculate()', () => {
    it('should return pare of type and produced fragment body', () => {
      const fragmentPattern = FragmentPattern.create(correctType, correctProduce);

      const gettingPare = fragmentPattern.calculate();

      expect(gettingPare).toEqual(formedPare);
    });
  });
});
