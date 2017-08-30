import composeReducer from '../composeReducer';

describe('composeReducer', () => {
  const upCounterAction = {
    type: 'UP_COUNTER',
  };
  const upCounterInState = prevState => ({
    counter: prevState.counter + 1,
  });
  const normalWorkers = new Map([
    [upCounterAction.type, upCounterInState],
  ]);
  const failWorkers = {
    [upCounterAction.type]: upCounterInState,
  };

  it('should create Reducer with getting workers and initial state', () => {
    const composedReducer = composeReducer(normalWorkers);
    expect(composedReducer({ counter: 0 }, upCounterAction)).toEqual({ counter: 1 });
  });

  it('should throw TypeError if getting workers isn`t Map collection with action type key and worker value', () => {
    const composeReducerCaller = () => composeReducer(failWorkers);
    expect(composeReducerCaller).toThrow(TypeError);
  });
});
