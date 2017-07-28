import { events } from './constants';

export const createConnection = () => ({ type: events.startTimer });

export const setCurrentConnectionStatus = status => ({
  type: events.setCurrentConnectionStatus,
  status
});
