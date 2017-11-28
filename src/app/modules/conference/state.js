import Immutable from 'immutable';
import { stateKeys } from './constants';

const state = Immutable.Map([
  [stateKeys.authorized, false],
  [stateKeys.client, null],
  [stateKeys.users, Immutable.Map()],
  [stateKeys.connections, Immutable.List()],
]);

export default state;
