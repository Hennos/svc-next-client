import createModule from '../utils/createModule';
import component from './component';
import reducer from './reducer';
import saga from './stories';
import { events, stateKeys } from './constants';

// todo: очень много писанины, необходимо по максимуму ужать до лаконичного api
export default createModule(
  component,
  reducer,
  saga,
  events,
  stateKeys,
);
