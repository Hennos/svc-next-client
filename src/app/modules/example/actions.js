import { events } from './constants';

export const startTimer = () => ({ type: events.startTimer });

export const upCount = () => ({ type: events.upCount });
