import { events } from '../constants';
import connectWithServer from './connectWithServer';

export default [
  [events.connect, connectWithServer],
];
