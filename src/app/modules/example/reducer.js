import { events, stateKeys } from './constants';
import initialState from './state';

function handleExampleEvent(state) {
  return state
    .set(stateKeys.count, state.get(stateKeys.count) + 1);
}

const workers = [
  [events.upCount, handleExampleEvent],
];

export default {
  workers,
  initialState,
};
