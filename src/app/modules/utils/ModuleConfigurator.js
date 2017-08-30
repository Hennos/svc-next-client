import composeReducer from './composeReducer';
import WorkersMap from './WorkersMap';

export default class ModuleConfigurator {
  static create() {
    return (component, reducer, saga) => ({
      component,
      reducer: ModuleConfigurator.composeReducer(reducer.workers, reducer.initialState),
      saga,
    });
  }

  static composeReducer(workers, initialState, safeFlag = false) {
    return composeReducer(
      safeFlag ?
        WorkersMap.create(workers) :
        new Map(workers),
      initialState);
  }
}
