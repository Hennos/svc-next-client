import FragmentProducerComponent from '../FragmentProducerComponent';
import FragmentProducer from '../FragmentProducer';

describe('FragmentProducerComponent', () => {
  const type = 'component';
  const body = {};

  describe('static create()', () => {
    it('returning instance should be instance of FragmentProducer', () => {
      const fragmentProducer = FragmentProducerComponent.create();

      expect(fragmentProducer).toBeInstanceOf(FragmentProducer);
    });
    it('returning instance should be instance of FragmentProducerComponent', () => {
      const fragmentProducer = FragmentProducerComponent.create();

      expect(fragmentProducer).toBeInstanceOf(FragmentProducerComponent);
    });
  });

  describe('getType()', () => {
    it(`should return ${type} type of producer`, () => {
      const fragmentProducer = FragmentProducerComponent.create();

      const gettingType = fragmentProducer.getType();

      expect(gettingType).toBe(type);
    });
  });

  describe('getProduce(body)', () => {});
});

