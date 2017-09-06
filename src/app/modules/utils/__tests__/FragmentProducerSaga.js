import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { put } from 'redux-saga/effects';
import FragmentProducerSaga from '../FragmentProducerSaga';
import FragmentProducer from '../FragmentProducer';

describe('FragmentProducerSaga', () => {
  const initialState = {
    counter: 0,
  };
  const stateWithUpCounter = {
    counter: 1,
  };

  const addToCounterActionType = 'ADD_TO_COUNTER';
  const addToCounterAction = value => ({
    type: addToCounterActionType,
    value,
  });
  function addToCounter(prevState, { value }) {
    return {
      counter: prevState.counter + value,
    };
  }
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case addToCounterActionType:
        return addToCounter(state, action);
      default:
        return state;
    }
  };

  const upCounterBySagaActionType = 'UP_COUNTER';
  const upCounterBySagaAction = {
    type: upCounterBySagaActionType,
  };
  function* upCounterBySaga() {
    yield put(addToCounterAction(1));
  }

  const bodySagaProducer = [
    [upCounterBySagaActionType, upCounterBySaga],
  ];
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
      const runSagaCaller = () => {
        const sagaMiddleware = createSagaMiddleware();
        const store = createStore(
          reducer,
          applyMiddleware(sagaMiddleware),
        );
        const producingSaga = fragmentProducer.produce(bodySagaProducer);
        sagaMiddleware.run(producingSaga);
      };

      expect(runSagaCaller).not.toThrow();
    });
    it('created saga should handle their action, dispatched to store', () => {
      const sagaMiddleware = createSagaMiddleware();
      const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware),
      );
      const producingSaga = fragmentProducer.produce(bodySagaProducer);
      sagaMiddleware.run(producingSaga);
      store.dispatch(upCounterBySagaAction);
      const currentState = store.getState();

      expect(currentState).toEqual(stateWithUpCounter);
    });
  });
});

