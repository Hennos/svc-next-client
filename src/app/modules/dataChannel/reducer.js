import { events, stateKeys } from './constants';
import initialState from './state';

function handleCurrentConnectionStatus(state, action) {
  return state
    .set(stateKeys.status, action.status);
}

const handlers = new Map([
  [events.setCurrentConnectionStatus, handleCurrentConnectionStatus],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);
  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }
  return state;
};

export default reducer;
