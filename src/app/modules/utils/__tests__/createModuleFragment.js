import { createStore } from 'redux';
import createModuleFragment from '../createModuleFragment';
import ModuleFragment from '../ModuleFragment';

const CORRECT_TYPE = 'reducer';
const correctConfig = {
  type: CORRECT_TYPE,
  body: {},
};

const invalidConfig = {
  body: {},
};

const REDUCER_TYPE = 'reducer';
const reducerConfig = {
  type: REDUCER_TYPE,
  body: {
    workers: [
      ['UP_COUNTER', prevState => ({ counter: prevState.counter + 1 })],
    ],
    initialState: {
      counter: 0,
    },
  },
};

const COMPONENT_TYPE = 'component';
const componentConfig = {
  type: COMPONENT_TYPE,
  body: () => null,
};

const SAGA_TYPE = 'saga';
const sagaConfig = {
  type: SAGA_TYPE,
  body: {},
};

describe('createModuleFragment(config)', () => {
  it('should return instance of ModuleFragment', () => {
    const moduleFragment = createModuleFragment(correctConfig);

    expect(moduleFragment).toBeInstanceOf(ModuleFragment);
  });
  it('should throw TypeError if can not create fragment with getting config', () => {
    const createModuleFragmentCaller = () => createModuleFragment(invalidConfig);

    expect(createModuleFragmentCaller).toThrow(TypeError);
  });
  // Проверять сообщения ошибок, могут неправильно конфигурироваться
  it('created ModuleFragment should return pare with "reducer" type at first position if get config for reducer', () => {
    const moduleFragment = createModuleFragment(reducerConfig);

    const [gettingType] = moduleFragment.get();

    expect(gettingType).toEqual(REDUCER_TYPE);
  });
  it('created ModuleFragment should return pare with correct reducer at second position if get config for reducer', () => {
    const moduleFragment = createModuleFragment(reducerConfig);

    const [gettingType, gettingReducer] = moduleFragment.get();
    const store = createStore(gettingReducer);

    expect(store.getState().counter).toBe(0);
  });
  it('created ModuleFragment should return pare with "component" type at first position if get config for component', () => {
    const moduleFragment = createModuleFragment(componentConfig);

    const [gettingType] = moduleFragment.get();

    expect(gettingType).toEqual(COMPONENT_TYPE);
  });
  it('created ModuleFragment should return pare with "saga" type at first position if get config for saga', () => {
    const moduleFragment = createModuleFragment(sagaConfig);

    const [gettingType] = moduleFragment.get();

    expect(gettingType).toEqual(SAGA_TYPE);
  });
});
