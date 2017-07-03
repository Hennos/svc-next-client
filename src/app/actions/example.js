import { events } from '../constants/example';

export const startTimer = () => ({ type: events.startTimer });

export const upCount = () => ({ type: events.upCount });
