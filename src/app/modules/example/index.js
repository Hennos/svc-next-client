import createModule from './utils/createModule';
import component from './component';
import reducer from './reducer';
import narrator from './stories';
import {
  events,
  stateKeys,
} from './constants';

export default createModule(component, reducer, narrator, events, stateKeys);
