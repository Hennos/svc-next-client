import createFragmentProducer from './createFragmentProducer';
import FragmentPattern from './FragmentPattern';
import ModuleFragment from './ModuleFragment';

export default function createModuleFragment(config) {
  if (!(config.getType && config.getBody)) {
    throw new TypeError('createModuleFragment: config is invalid');
  }
  try {
    const fragmentType = config.getType();
    const fragmentBody = config.getBody();
    const fragmentProducer = createFragmentProducer(fragmentType);
    const producedFragment = fragmentProducer.produce(fragmentBody);
    const fragmentPattern = FragmentPattern.create(fragmentType, producedFragment);
    return ModuleFragment.create(fragmentPattern);
  } catch (error) {
    throw new TypeError(`createModuleFragment(config) => ${error.message}`);
  }
}
