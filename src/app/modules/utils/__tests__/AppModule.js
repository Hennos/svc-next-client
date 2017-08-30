import { shallow } from 'enzyme';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppModule from '../AppModule';

function createAppModuleBody() {
  return {
    component: Jest.fn(),
    reducer: {
      initialState: {
        counter: 0,
      },
      workers: [
        ['SOMEONE_ACTION', Jest.fn()],
      ],
    },
    saga: [],
  };
}

describe('AppModule', () => {
  const body = createAppModuleBody();

  describe('static create()', () => {
    it('should create instance of AppModule', () => {
      expect(AppModule.create(body)).toBeInstanceOf(AppModule);
    });
  });

  describe('property component', () => {
    it('should be React element', () => {
      const module = AppModule.create(body);
      const renderComponent = () => shallow(module.component);
      expect(renderComponent).not.toThrow();
    });
  });

  describe('property reducer', () => {
    it('should be correct Redux reducer if getting reducer body correct', () => {
      const module = AppModule.create(body);
      const createModuleStore = () => createStore(module.reducer);
      expect(createModuleStore).not.toThrow();
    });
    it('should be undefined if getting reducer body failure', () => {
      const module = AppModule.create(body);
      expect(module.reducer).toBeUndefined();
    });
  });

  describe('property saga', () => {
    it('should be correct redux-saga saga if getting saga body correct', () => {
      const module = AppModule.create(body);
      const sagaMiddleware = createSagaMiddleware();
      const store = createStore(
        module.reducer,
        applyMiddleware(sagaMiddleware),
      )
      const runModuleSaga = () => sagaMiddleware.run(module.saga);
      expect(runModuleSaga).not.toThrow();
    });
    it('should be undefined if getting saga body failure', () => {
      const module = AppModule.create(body);
      expect(module.saga).toBeUndefined();
    });
  });
});
