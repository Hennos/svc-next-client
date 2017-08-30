import Worker from '../Worker';

describe('Worker', () => {
  const action = 'SOMEONE_ACTION';
  const anotherAction = 'ANOTHER_ACTION';
  const handler = state => state;
  const workerPare = [action, handler];

  describe('static create()', () => {
    it('should create worker with getting pare action type - handler', () => {
      const worker = Worker.create(action, handler);

      expect(worker).toBeInstanceOf(Worker);
    });

    it('should throw TypeError if getting body-pare uncorrect or non provided', () => {
      const createWorkerCaller = () => Worker.create();

      expect(createWorkerCaller).toThrow(TypeError);
    });
  });

  describe ('is(action)', () => {
    it('should return true if action equal reserved action', () => {
      const worker = Worker.create(action, handler);

      const isWorkerAction = worker.is(action);

      expect(isWorkerAction).toBeTruthy();
    });

    it('should return false if action unknown', () => {
      const worker = Worker.create(action, handler);

      const isWorkerAction = worker.is(anotherAction);

      expect(isWorkerAction).toBeFalsy();
    });
  });

  describe ('getHandler()', () => {
    it('should return worker`s handler', () => {
      const worker = Worker.create(action, handler);

      const gettingHandler = worker.getHandler();

      expect(gettingHandler).toBe(handler);
    });
  });

  describe('getPare()', () => {
    it('should return reserved pare action-handler', () => {
      const worker = Worker.create(action, handler);

      const gettinPare = worker.getPare();

      expect(gettinPare).toEqual(workerPare);
    });
  });
});
