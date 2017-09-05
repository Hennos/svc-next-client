export default class FragmentProducer {
  static create() {
    throw new ReferenceError('FragmentProducer: create() is abstract and must be rewrite on childs');
  }

  produce(body) {
    throw new ReferenceError('FragmentProducer: produce() is abstract and must be rewrite on childs');
  }
}
