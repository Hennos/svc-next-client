import {
  createStore,
  applyMiddleware
} from 'redux';
import { createSagaMiddleware } from 'redux-saga';
import FragmentProducerSaga from '../FragmentProducerSaga';
import FragmentProducer from '../FragmentProducer';

describe('FragmentProducerSaga', () => {
  const body = [];
  const reducer = (state = {}) => state;
  const invalidBody = 'invalid';
  const fragmentProducer = FragmentProducerSaga.create();

  describe('static create()', () => {
    it('returning instance should be instance of FragmentProducer', () => {
      expect(fragmentProducer).toBeInstanceOf(FragmentProducer);
    });
    it('returning instance should be instance of FragmentProducerSaga', () => {
      expect(fragmentProducer).toBeInstanceOf(FragmentProducerSaga);
    });
  });

  describe('produce(body)', () => {
    it('should throw TypeError if getting invalid body', () => {
      const produceCaller = () => fragmentProducer.produce(invalidBody);

      expect(produceCaller).toThrow();
    });
    it('should return valid saga', () => {
      const producingSaga = fragmentProducer.produce(body);

      const sagaMiddleware = createSagaMiddleware();
      const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware),
      );
      const runSagaCaller = () => sagaMiddleware.run(producingSaga);

      expect(runSagaCaller).not.toThrow();
    });
  });
});

