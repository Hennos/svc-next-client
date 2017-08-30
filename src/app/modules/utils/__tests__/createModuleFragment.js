import createModuleFragment from '../createModuleFragment';
import ModuleFragment from '../ModuleFragment';

describe('createModuleFragment(config)', () => {
  const correctConfig = {
    type: 'reducer',
    body: {},
  };
  const invalidConfig = {
    body: {},
  };

  it('should return instance of ModuleFragment', () => {
    const moduleFragment = createModuleFragment(correctConfig);

    expect(moduleFragment).toBeInstanceOf(ModuleFragment);
  });
  it('should throw TypeError if config invalid', () => {
    const createModuleFragmentCaller = () => createModuleFragment(invalidConfig);

    expect(createModuleFragmentCaller).toThrow(TypeError);
  });
});
