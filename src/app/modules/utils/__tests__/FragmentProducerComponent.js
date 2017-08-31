import FragmentProducerComponent from '../FragmentProducerComponent';
import FragmentProducer from '../FragmentProducer';

describe('FragmentProducerComponent', () => {
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

  describe('getProduce(body)', () => {
    it('', () => {

    });
    it('should return valid react component', () => {

    });
  });
});

