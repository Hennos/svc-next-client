import FragmentProducer from '../FragmentProducer';

describe('FragmentProducer', () => {
  describe('static create()', () => {
    it('should throw ReferenceError by calling on abstract class', () => {
      const createProducerCaller = () => FragmentProducer.create();

      expect(createProducerCaller).toThrow(ReferenceError);
    });
  });
});
