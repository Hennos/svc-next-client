import mapFragmentProducers from '../mapFragmentProducers';
import FragmentProducer from '../FragmentProducer';
import FragmentProducerComponent from '../FragmentProducerComponent';
import FragmentProducerReducer from '../FragmentProducerReducer';
import FragmentProducerSaga from '../FragmentProducerSaga';

describe('mapFragmentProducers', () => {
  const definedType = 'reducer';
  const componentType = 'component';
  const sagaType = 'saga';
  const reducerType = 'reducer';
  const undefinedType = 'undefined';

  describe('has(type)', () => {
    it('should return true if consist getting type of FragmentProducer', () => {
      const gettingTypeDefined = mapFragmentProducers.has(definedType);

      expect(gettingTypeDefined).toBeTruthy();
    });
    it('should return false not consist getting type of FragmentProducer', () => {
      const gettingTypeDefined = mapFragmentProducers.has(undefinedType);

      expect(gettingTypeDefined).toBeFalsy();
    });
  });

  describe('get(type)', () => {
    it('should return instance of FragmentProducerReducer by calling with "reducer" type', () => {
      const fragmentProducer = mapFragmentProducers.get(reducerType);

      expect(fragmentProducer).toBeInstanceOf(FragmentProducerReducer);
    });
    it('returning instance of FragmentProducerReducer should has supertype FragmentProducer', () => {
      const fragmentProducer = mapFragmentProducers.get(reducerType);

      expect(fragmentProducer).toBeInstanceOf(FragmentProducer);
    });
    it('should return instance of FragmentProducerComponent by calling with "component" type', () => {
      const fragmentProducer = mapFragmentProducers.get(componentType);

      expect(fragmentProducer).toBeInstanceOf(FragmentProducerComponent);
    });
    it('returning instance of FragmentProducerComponent should has supertype FragmentProducer', () => {
      const fragmentProducer = mapFragmentProducers.get(componentType);

      expect(fragmentProducer).toBeInstanceOf(FragmentProducer);
    });
    it('should return instance of FragmentProducerSaga by calling with "saga" type', () => {
      const fragmentProducer = mapFragmentProducers.get(sagaType);

      expect(fragmentProducer).toBeInstanceOf(FragmentProducerSaga);
    });
    it('returning instance of FragmentProducerSaga should has supertype FragmentProducer', () => {
      const fragmentProducer = mapFragmentProducers.get(sagaType);

      expect(fragmentProducer).toBeInstanceOf(FragmentProducer);
    });
  });
});
