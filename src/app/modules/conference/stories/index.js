import { events } from '../constants';
import createConnection from './createConnection';

export default [
  [events.connect, createConnection],
];
