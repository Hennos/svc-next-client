import createFragmentProducer from '../createFragmentProducer';
import FragmentProducer from '../FragmentProducer';

describe('createFragmentProducer(type)', () => {
  const validType = 'reducer';
  const invalidType = 'invalid';

  it('should return instance of FragmentProducer', () => {
    const fragmentProducer = createFragmentProducer(validType);

    expect(fragmentProducer).toBeInstanceOf(FragmentProducer);
  });
  it('should throw TypeError if getting type is undefined type of FragmentProducer', () => {
    const createProducerCaller = () => createFragmentProducer(invalidType);

    expect(createProducerCaller).toThrow(TypeError);
  });
});
