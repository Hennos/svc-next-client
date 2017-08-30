import FragmentConfiguration from './FragmentConfiguration';
import createFragmentProducer from './createFragmentProducer';
import ModuleFragment from './ModuleFragment';

export default function createModuleFragment(config) {
  try {
    const fragmentConfig = FragmentConfiguration.create(config);
    const fragmentProducer = createFragmentProducer(fragmentConfig.getType());
    const producePattern = fragmentProducer.getProduce(fragmentConfig.getBody());
    return ModuleFragment.create(producePattern);
  } catch (error) {
    throw new TypeError(`createModuleFragment(config) => ${error.message}`);
  }
}
