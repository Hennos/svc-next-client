import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reducers from './reducers';
import rootSaga from './sagas';

function createAppStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    Reducers,
    applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

export default createAppStore;

