import React from 'react';
import FragmentProducer from './FragmentProducer';

export default class FragmentProducerComponent extends FragmentProducer {
  static create() {
    return new FragmentProducerComponent();
  }

  produce(body) {
    if (typeof body !== 'function') {
      throw new TypeError('FragmentProducer => produce(body): body is not a function');
    }

    return <body />;
  }
}
