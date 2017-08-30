import FragmentProducerSaga from '../FragmentProducerSaga';
import FragmentProducer from '../FragmentProducer';

describe('FragmentProducerSaga', () => {
  const type = 'saga';
  const body = {};

  describe('static create()', () => {
    it('returning instance should be instance of FragmentProducer', () => {
      const fragmentProducer = FragmentProducerSaga.create();

      expect(fragmentProducer).toBeInstanceOf(FragmentProducer);
    });
    it('returning instance should be instance of FragmentProducerSaga', () => {
      const fragmentProducer = FragmentProducerSaga.create();

      expect(fragmentProducer).toBeInstanceOf(FragmentProducerSaga);
    });
  });

  describe('getType()', () => {
    it(`should return ${type} type of producer`, () => {
      const fragmentProducer = FragmentProducerSaga.create();

      const gettingType = fragmentProducer.getType();

      expect(gettingType).toBe(type);
    });
  });

  describe('getProduce(body)', () => {

  });
});

