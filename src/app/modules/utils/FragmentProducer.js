export default class FragmentProducer {
  static create() {
    throw new ReferenceError('FragmentProducer: create() is abstract and must be rewrite on childs');
  }

  constructor() {}

  getProduce(body) {
    throw new ReferenceError('FragmentProducer: getProduce() is abstract and must be rewrite on childs');
  }
}
