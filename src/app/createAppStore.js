import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

// todo: нужен модуль, который будет заниматься сборкой
// проекта из полученного списка модулей проекта

function createAppStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

export default createAppStore;
