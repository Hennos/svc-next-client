import React from 'react';
import {
  createStore,
  applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { put } from 'redux-saga/effects';
import configurateModule from '../configurateModule';

describe ('configurateModule(configs)', () => {
  const upCounterActionType = 'UP_COUNTER';
  const upCounterBySagaActionType = 'UP_COUNTER_BY_SAGA';
  const upCounterAction = {
    type: upCounterActionType,
  };
  const upCounterBySagaAction = {
    type: upCounterBySagaActionType,
  };
  function upCounter(prevState = {}) {
    return {
      counter: prevState.counter + 1,
    };
  }
  function* upCounterSaga() {
    yield put(upCounterAction);
  }
  const initialState = {
    counter: 0,
  };
  const upCounterState = upCounter(initialState);

  const configs = [{
    type: 'component',
    body: () => null,
  }, {
    type: 'reducer',
    body: {
      workers: [
        [upCounterActionType, upCounter],
      ],
      initialState,
    },
  }, {
    type: 'saga',
    body: [
      [upCounterBySagaActionType, upCounterSaga],
    ],
  }];

  const module = configurateModule(configs);
  it('should return object if configs valid', () => {
    const moduleIsObject = typeof module === 'object';

    expect(moduleIsObject).toBeTruthy();
  });
  it('with getting configs should return object with valid component at "component" property', () => {
    
  });
  it('with getting configs should return object with valid reducer at "reducer" property', () => {
    const gettingReducer = module.reducer;
    const store = createStore(gettingReducer);
    store.dispatch(upCounterAction);
    const currentState = store.getState();

    expect(currentState).toEqual(upCounterState);
  });
  it('with getting configs should return object with valid saga at "saga" property', () => {
    const gettingReducer = module.reducer;
    const gettingSaga = module.saga;
    console.error(Object.keys(module).length);
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      gettingReducer,
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(gettingSaga);
    store.dispatch(upCounterBySagaAction);
    const currentState = store.getState();

    expect(currentState).toEqual(upCounterState);
  });
});
