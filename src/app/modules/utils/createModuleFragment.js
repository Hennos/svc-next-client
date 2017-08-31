import FragmentConfiguration from './FragmentConfiguration';
import createFragmentProducer from './createFragmentProducer';
import FragmentPattern from './FragmentPattern';
import ModuleFragment from './ModuleFragment';

export default function createModuleFragment(config) {
  try {
    const fragmentConfig = FragmentConfiguration.create(config);
    const fragmentType = fragmentConfig.getType();
    const fragmentProducer = createFragmentProducer(fragmentType);
    const produceFragmentBody = fragmentProducer.getProduce(fragmentConfig.getBody());
    const fragmentPattern = FragmentPattern.create(fragmentType, produceFragmentBody);
    return ModuleFragment.create(fragmentPattern.get());
  } catch (error) {
    throw new TypeError(`createModuleFragment(config) => ${error.message}`);
  }
}
