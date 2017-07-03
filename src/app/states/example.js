import Immutable from 'immutable';
import { stateKeys } from '../constants/example';

const state = Immutable.Map([
  [stateKeys.count, 0],
]);

export default state;
