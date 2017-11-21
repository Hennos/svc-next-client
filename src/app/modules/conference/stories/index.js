import { events } from '../constants';

import flowAuthorization from './flowAuthorization';
import flowConnectionServer from './flowConnectionServer';
import flowConnectionP2P from './flowConnectionP2P';
import flowConnectionMP2P from './flowConnectionMP2P';

export default [
  [events.authorize, flowAuthorization],
  [events.connect, flowConnectionServer],
  [events.connectDone, flowConnectionP2P],
  [events.connecterCreated, flowConnectionMP2P],
];
