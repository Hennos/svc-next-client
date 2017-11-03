import Immutable from 'immutable';
import { stateKeys } from './constants';

const state = Immutable.Map([
  [stateKeys.client, {
    name: 'Борис',
  }],
  [stateKeys.users, Immutable.Map()],
]);

export default state;