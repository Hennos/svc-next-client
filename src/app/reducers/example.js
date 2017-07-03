import { events, stateKeys } from '../constants/example';
import initialState from '../states/example';

function handleExampleEvent(state) {
  return state
    .set(stateKeys.count, state.get(stateKeys.count) + 1);
}

const handlers = new Map([
  [events.upCount, handleExampleEvent],
]);

const Reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);
  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }
  return state;
};

export default Reducer;
