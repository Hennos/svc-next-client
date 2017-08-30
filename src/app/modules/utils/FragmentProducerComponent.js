import FragmentProducer from './FragmentProducer';

export default class FragmentProducerComponent extends FragmentProducer {
  static create() {
    return new FragmentProducerComponent();
  }

  constructor() {
    super('component');
  }

  getProduce(body) {}
}
