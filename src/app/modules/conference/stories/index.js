import { events } from '../constants';
import flowConnectionServer from './flowConnectionServer';
import flowConnectionP2P from './flowConnectionP2P';
import pingPongTask from './pingPongTask';

export default [
  [events.connect, flowConnectionServer],
  [events.connectDone, flowConnectionP2P],
  [events.askPeerDelay, pingPongTask],
];
