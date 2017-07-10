import delay from '../delay';

describe('delay', () => {
  it('triggered after one second', () => {
    const startTime = Date.now();
    const delayTime = 100;
    const delayTimeWithScatter = delayTime + 10;
    return delay(delayTime)
      .then(() => {
        const endingTime = Date.now();
        expect((endingTime - startTime) <= delayTimeWithScatter).toBe(true);
      });
  });
});
