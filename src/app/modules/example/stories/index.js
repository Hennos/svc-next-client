import { takeEvery } from 'redux-saga/effects';
import { events } from '../constants';
import startTimerLoop from './startTimerLoop';

function* narrator() {
  yield takeEvery(events.startTimer, startTimerLoop);
}

export default narrator;
