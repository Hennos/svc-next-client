import React from 'react';
import {
  createStore,
  applyMiddleware
} from 'redux';
import { mount } from 'enzyme';
import createSagaMiddleware from 'redux-saga';
import { put } from 'redux-saga/effects';
import createModuleFragment from '../createModuleFragment';
import ModuleFragment from '../ModuleFragment';
import FragmentConfiguration from '../FragmentConfiguration';

const CORRECT_TYPE = 'reducer';
const correctConfig = FragmentConfiguration.create({
  type: CORRECT_TYPE,
  body: {},
});

const invalidConfig = {
  body: {},
};

const REDUCER_TYPE = 'reducer';
const upCounterByReducerActionType = 'UP_COUNTER_REDUCER';
const upCounterByReducerAction = {
  type: upCounterByReducerActionType,
};
const upCounter = prevState => ({
  counter: prevState.counter + 1,
});
const initialState = {
  counter: 0,
};
const stateAfterUpCounter = upCounter(initialState);
const reducerConfig = FragmentConfiguration.create({
  type: REDUCER_TYPE,
  body: {
    workers: [
      [upCounterByReducerActionType, upCounter],
    ],
    initialState: {
      counter: 0,
    },
  },
});
const handmadeReducer = (state = initialState, action) => {
  switch (action.type) {
    case upCounterByReducerActionType:
      return upCounter(state);
    default:
      return state;
  }
};

const COMPONENT_TYPE = 'component';
const componentConfig = FragmentConfiguration.create({
  type: COMPONENT_TYPE,
  body: () => null,
});

const upCounterBySagaActionType = 'UP_COUNTER_SAGA';
const upCounterBySagaAction = {
  type: upCounterBySagaActionType,
};
function* upCounterBySaga() {
  yield put(upCounterByReducerAction);
}
const SAGA_TYPE = 'saga';
const sagaConfig = FragmentConfiguration.create({
  type: SAGA_TYPE,
  body: [
    [upCounterBySagaActionType, upCounterBySaga],
  ],
});

describe('createModuleFragment(config)', () => {
  it('should return instance of ModuleFragment', () => {
    const moduleFragment = createModuleFragment(correctConfig);

    expect(moduleFragment).toBeInstanceOf(ModuleFragment);
  });
  it('should throw TypeError if can not create fragment with getting config', () => {
    const createModuleFragmentCaller = () => createModuleFragment(invalidConfig);

    expect(createModuleFragmentCaller).toThrow(TypeError);
  });
  // todo: Проверять сообщения ошибок, могут неправильно конфигурироваться
  it('created ModuleFragment should return pare with "reducer" type at first position if get config for reducer', () => {
    const moduleFragment = createModuleFragment(reducerConfig);

    const [gettingType] = moduleFragment.get();

    expect(gettingType).toEqual(REDUCER_TYPE);
  });
  it('created ModuleFragment should return pare with correct reducer at second position if get config for reducer', () => {
    const moduleFragment = createModuleFragment(reducerConfig);

    const [gettingType, gettingReducer] = moduleFragment.get();
    const store = createStore(gettingReducer);
    store.dispatch(upCounterByReducerAction);
    const currentState = store.getState();

    expect(currentState).toEqual(stateAfterUpCounter);
  });
  it('created ModuleFragment should return pare with "component" type at first position if get config for component', () => {
    const moduleFragment = createModuleFragment(componentConfig);

    const [gettingType] = moduleFragment.get();

    expect(gettingType).toEqual(COMPONENT_TYPE);
  });
  it('createdModuleFragment should return pare with valid component at second position if get config for component', () => {
    const moduleFragment = createModuleFragment(componentConfig);

    const [gettingType, gettingComponent] = moduleFragment.get();
    const mountComponentCaller = () => mount(React.createElement(gettingComponent));

    expect(mountComponentCaller).not.toThrow();
  });
  it('created ModuleFragment should return pare with "saga" type at first position if get config for saga', () => {
    const moduleFragment = createModuleFragment(sagaConfig);

    const [gettingType] = moduleFragment.get();

    expect(gettingType).toEqual(SAGA_TYPE);
  });
  it('created ModuleFragment should return pare with valid saga at second position of get config for saga', () => {
    const moduleFragment = createModuleFragment(sagaConfig);

    const [gettingType, gettingSaga] = moduleFragment.get();
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      handmadeReducer,
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(gettingSaga);
    store.dispatch(upCounterBySagaAction);
    const currentState = store.getState();

    expect(currentState).toEqual(stateAfterUpCounter);
  });
});
