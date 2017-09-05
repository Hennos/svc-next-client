import React from 'react';
import { shallow } from 'enzyme';
import FragmentProducerComponent from '../FragmentProducerComponent';
import FragmentProducer from '../FragmentProducer';

describe('FragmentProducerComponent', () => {
  const body = () => <div>Test</div>;
  const invalidBody = 'invalid';

  describe('static create()', () => {
    it('returning instance should be instance of FragmentProducer', () => {
      const fragmentProducer = FragmentProducerComponent.create();

      expect(fragmentProducer).toBeInstanceOf(FragmentProducer);
    });
    it('returning instance should be instance of FragmentProducerComponent', () => {
      const fragmentProducer = FragmentProducerComponent.create();

      expect(fragmentProducer).toBeInstanceOf(FragmentProducerComponent);
    });
  });

  describe('getProduce(body)', () => {
    const fragmentProducer = FragmentProducerComponent.create();

    it('returning value should be function', () => {
      const gettingProduce = fragmentProducer.getProduce(body);
      const produceIsFunc = typeof gettingProduce === 'function';

      expect(produceIsFunc).toBeTruthy();
    });
    it('should throw TypeError if getting body in not a function', () => {
      const getProduceCaller = () => fragmentProducer.getProduce(invalidBody);

      expect(getProduceCaller).toThrow(TypeError);
    });
    it('should return valid react component', () => {
      const gettingProduce = fragmentProducer.getProduce(body);
      const producingComponent = gettingProduce();
      const wrappedComponent = shallow(producingComponent);

      expect(wrappedComponent.equals(<body />)).toBeTruthy();
    });
  });
});

