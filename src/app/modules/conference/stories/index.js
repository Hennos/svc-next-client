import { events } from '../constants';
import flowConnectionServer from './flowConnectionServer';
import flowConnectionP2P from './flowConnectionP2P';

export default [
  [events.connect, flowConnectionServer],
  [events.connectP2P, flowConnectionP2P],
];
