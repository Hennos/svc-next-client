import { call, put, takeEvery } from 'redux-saga/effects';
import delay from '../controllers/delay';
import { events } from '../constants/example';
import { upCount } from '../actions/example';

function* startTimerLoop() {
  try {
    for (;;) {
      yield call(delay, 1000);
      yield put(upCount());
    }
  } catch (error) {
    throw error;
  }
}

function* watchExampleEvents() {
  yield takeEvery(events.startTimer, startTimerLoop);
}

export default watchExampleEvents;
