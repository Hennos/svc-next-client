function composeReducer(workers, initialState = {}) {
  if (typeof workers.get !== 'function') {
    throw new TypeError(`composeReducer: maybe workers is not Map collection object because workers.get is "${workers.get}"`);
  }
  return (state = initialState, action) => {
    const handleAction = workers.get(action.type);
    if (typeof handleAction === 'function') {
      return handleAction(state, action);
    }
    return state;
  };
}

export default composeReducer;
