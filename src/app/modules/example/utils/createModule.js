function createModule(component, reducer, narrator, ...utils) {
  if (!component) {
    throw new Error('createModule: you must pass a component');
  }
  return {
    component,
    reducer,
    narrator,
    utils,
  };
}

export default createModule;
