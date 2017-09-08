import { events } from '../constants';
import startTimerLoop from './startTimerLoop';

export default [
  [events.startTimer, startTimerLoop],
];

