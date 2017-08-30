import createModule from '../utils/createModule';
import component from './component';
import reducer from './reducer';
import saga from './stories';
import { events, stateKeys } from './constants';

export default createModule(
  component,
  reducer,
  saga,
  events,
  stateKeys,
);