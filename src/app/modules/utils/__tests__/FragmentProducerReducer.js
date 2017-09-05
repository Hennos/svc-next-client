import { createStore } from 'redux';
import FragmentProducerReducer from '../FragmentProducerReducer';
import FragmentProducer from '../FragmentProducer';

describe('FragmentProducerReducer', () => {
  const upCounterAction = {
    type: 'UP_COUNTER',
  };
  const upCounterInState = prevState => ({
    counter: prevState.counter + 1,
  });

  const initialState = {
    counter: 0,
  }

  const emptyBody = {};

  const correctWorkers = [
    [upCounterAction.type, upCounterInState],
  ];
  const correctBody = {
    workers: correctWorkers,
    initialState,
  };

  const invalidWorkers = {
    [upCounterAction.type]: upCounterInState,
  };
  const invalidBody = {
    workers: invalidWorkers,
    initialState,
  };
  const fragmentProducer = FragmentProducerReducer.create();

  describe('static create()', () => {
    it('returning instance should be instance of FragmentProducer', () => {
      expect(fragmentProducer).toBeInstanceOf(FragmentProducer);
    });
    it('returning instance should be instance of FragmentProducerReducer', () => {
      expect(fragmentProducer).toBeInstanceOf(FragmentProducerReducer);
    });
  });

  describe('produce(body)', () => {
    it('should throw TypeError if getting invalid body', () => {
      const produceCaller = () => fragmentProducer.produce(invalidBody);

      expect(produceCaller).toThrow(TypeError);
    });
    it('should return reducer', () => {
      const producingReducer = fragmentProducer.produce(correctBody);

      expect(producingReducer(undefined, upCounterAction)).toEqual({ counter: 1 });
    });
    it('redux should create store with state equals initialState by getting created reducer', () => {
      const producingReducer = fragmentProducer.produce(correctBody);
      const creatingStore = createStore(producingReducer);
      const storeState = creatingStore.getState();

      expect(storeState).toEqual(initialState);
    });
  });
});

