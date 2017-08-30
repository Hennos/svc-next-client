export default class FragmentProducer {
  static create() {
    throw new ReferenceError('FragmentProducer: create() is abstract and must be rewrite on childs');
  }

  constructor(type) {
    if (typeof type !== 'string') {
      throw new TypeError('FragmentProducer: type in constructor isn`t string');
    }

    this.getType = () => type;
  }

  getProduce(body) {
    throw new ReferenceError('FragmentProducer: getProduce() is abstract and must be rewrite on childs');
  }
}
