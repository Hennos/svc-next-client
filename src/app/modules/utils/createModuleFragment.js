import FragmentConfiguration from './FragmentConfiguration';
import createFragmentProducer from './createFragmentProducer';
import FragmentPattern from './FragmentPattern';
import ModuleFragment from './ModuleFragment';

export default function createModuleFragment(config) {
  try {
    const fragmentConfig = FragmentConfiguration.create(config);
    const fragmentType = fragmentConfig.getType();
    const fragmentBody = fragmentConfig.getBody();
    const fragmentProducer = createFragmentProducer(fragmentType);
    const producedFragment = fragmentProducer.produce(fragmentBody);
    const fragmentPattern = FragmentPattern.create(fragmentType, producedFragment);
    return ModuleFragment.create(fragmentPattern);
  } catch (error) {
    throw new TypeError(`createModuleFragment(config) => ${error.message}`);
  }
}
