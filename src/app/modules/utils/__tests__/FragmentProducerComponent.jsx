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

  describe('produce(body)', () => {
    const fragmentProducer = FragmentProducerComponent.create();

    it('should throw TypeError if getting body is invalid', () => {
      const produceCaller = () => fragmentProducer.produce(invalidBody);

      expect(produceCaller).toThrow(TypeError);
    });
    it('should return valid react component', () => {
      const producedComponent = fragmentProducer.produce(body);
      const wrappedComponent = shallow(producedComponent);

      expect(wrappedComponent.equals(<body />)).toBeTruthy();
    });
  });
});

