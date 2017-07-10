import { events, stateKeys } from './constants';
import initialState from './state';

function handleExampleEvent(state) {
  return state
    .set(stateKeys.count, state.get(stateKeys.count) + 1);
}

const handlers = new Map([
  [events.upCount, handleExampleEvent],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);
  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }
  return state;
};

export default reducer;
