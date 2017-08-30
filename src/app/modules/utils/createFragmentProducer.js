import mapFragmentProducers from './mapFragmentProducers';

export default function createFragmentProducer(type) {
  if (!mapFragmentProducers.has(type)) {
    throw new TypeError('createFragmentProducer(type): type is undefined');
  }

  return mapFragmentProducers.get(type);
}
