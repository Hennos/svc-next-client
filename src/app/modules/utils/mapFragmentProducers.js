import FragmentProducerComponent from './FragmentProducerComponent';
import FragmentProducerReducer from './FragmentProducerReducer';
import FragmentProducerSaga from './FragmentProducerSaga';

function createMapEntries(...args) {
  return args.map((FragmentProducer) => {
    const producer = FragmentProducer.create();
    return [producer.getType(), producer];
  });
}

const mapFragmentProducer = new Map(
  createMapEntries(
    FragmentProducerComponent,
    FragmentProducerReducer,
    FragmentProducerSaga,
  ),
);

export default mapFragmentProducer;

