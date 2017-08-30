import FragmentProducer from './FragmentProducer';

export default class FragmentProducerSaga extends FragmentProducer {
  static create() {
    return new FragmentProducerSaga();
  }

  constructor() {
    super('saga');
  }

  getProduce() {}
}
