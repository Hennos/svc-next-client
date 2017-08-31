import FragmentProducerComponent from './FragmentProducerComponent';
import FragmentProducerReducer from './FragmentProducerReducer';
import FragmentProducerSaga from './FragmentProducerSaga';

const PRODUCER_COMPONENT_TYPE = 'component';
const PRODUCER_REDUCER_TYPE = 'reducer';
const PRODUCER_SAGA_TYPE = 'saga';

const PRODUCER_TYPES = [
  [PRODUCER_COMPONENT_TYPE, FragmentProducerComponent],
  [PRODUCER_REDUCER_TYPE, FragmentProducerReducer],
  [PRODUCER_SAGA_TYPE, FragmentProducerSaga],
];

function createProducerEntries(types) {
  return types.map(([type, Producer]) => [type, Producer.create()]);
}

const entries = createProducerEntries(PRODUCER_TYPES);
const mapFragmentProducer = new Map(entries);

export default mapFragmentProducer;

