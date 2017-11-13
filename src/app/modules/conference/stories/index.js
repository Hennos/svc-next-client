import { events } from '../constants';

import flowAuthorization from './flowAuthorization';
import flowConnectionServer from './flowConnectionServer';
import flowConnectionP2P from './flowConnectionP2P';

export default [
  [events.authorize, flowAuthorization],
  [events.connect, flowConnectionServer],
  [events.connectDone, flowConnectionP2P],
];
