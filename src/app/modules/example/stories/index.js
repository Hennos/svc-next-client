import { takeEvery } from 'redux-saga/effects';
import { events } from '../constants';
import startTimerLoop from './startTimerLoop';

function* saga() {
  yield takeEvery(events.startTimer, startTimerLoop);
}

export default saga;

