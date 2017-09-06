import { all, takeEvery } from 'redux-saga/effects';
import FragmentProducer from './FragmentProducer';
import WorkersMap from './WorkersMap';

export default class FragmentProducerSaga extends FragmentProducer {
  static create() {
    return new FragmentProducerSaga();
  }

  produce(body = []) {
    if (!Array.isArray(body)) {
      throw new TypeError('FragmentProducerSaga => produce(body): body must be array');
    }
    try {
      const workersMap = WorkersMap.create(body);
      const workersEntries = workersMap.entries();
      const groupedSagas = workersEntries.map(([type, worker]) => takeEvery(type, worker));
      return function* rootSaga() {
        yield all(groupedSagas);
      };
    } catch (error) {
      throw new TypeError(`FragmentProducerSaga => produce(body): workers in body => ${error.message}`);
    }
  }
}
