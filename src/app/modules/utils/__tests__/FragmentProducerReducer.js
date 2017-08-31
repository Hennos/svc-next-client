import FragmentProducerReducer from '../FragmentProducerReducer';
import FragmentProducer from '../FragmentProducer';

describe('FragmentProducerReducer', () => {
  const upCounterAction = {
    type: 'UP_COUNTER',
  };
  const upCounterInState = prevState => ({
    counter: prevState.counter + 1,
  });

  const emptyBody = {};

  const correctWorkers = [
    [upCounterAction.type, upCounterInState],
  ];
  const correctBody = {
    workers: correctWorkers,
  };

  const invalidWorkers = {
    [upCounterAction.type]: upCounterInState,
  };
  const invalidBody = {
    workers: invalidWorkers,
  };

  describe('static create()', () => {
    it('returning instance should be instance of FragmentProducer', () => {
      const fragmentProducer = FragmentProducerReducer.create();

      expect(fragmentProducer).toBeInstanceOf(FragmentProducer);
    });
    it('returning instance should be instance of FragmentProducerReducer', () => {
      const fragmentProducer = FragmentProducerReducer.create();

      expect(fragmentProducer).toBeInstanceOf(FragmentProducerReducer);
    });
  });

  describe('getProduce(body)', () => {
    it('returning value should be function', () => {
      const fragmentProducer = FragmentProducerReducer.create();

      const gettingProduce = fragmentProducer.getProduce(emptyBody);
      const produceIsFunc = typeof gettingProduce === 'function';

      expect(produceIsFunc).toBeTruthy();
    });
    it('should throw TypeError if getting invalid body', () => {
      const fragmentProducer = FragmentProducerReducer.create();

      const getProduceCaller = fragmentProducer.getProduce(invalidBody);

      expect(getProduceCaller).toThrow(TypeError);
    });
    it('returning produce() should create reducer', () => {
      const fragmentProducer = FragmentProducerReducer.create();

      const gettingProduce = fragmentProducer.getProduce(correctBody);
      const producingReducer = gettingProduce();

      expect(producingReducer({ counter: 0 }, upCounterAction)).toEqual({ counter: 1 });
    });
  });
});

