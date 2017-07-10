import { call, put } from 'redux-saga/effects';
import delay from '../controllers/delay';
import { upCount } from '../actions';

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

export default startTimerLoop;
