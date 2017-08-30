import WorkersMap from '../WorkersMap';

describe('WorkersMap', () => {
  const action = 'action';
  const failureAction = 'failureAction';
  const handler = () => null;
  const anotherHandler = () => null;
  const workers = [
    [action, handler],
  ];
  const failureWorkers = [
    [failureAction],
  ];
  const workersWithDuplicate = [
    [action, handler],
    [action, anotherHandler],
  ];

  describe ('static create(workers)', () => {
    it ('should throw TypeError if workers parameter non Array', () => {
      const createWorkersMapCaller = () => WorkersMap.create(false);

      expect(createWorkersMapCaller).toThrow(TypeError);
    });
    it('should create instance of WorkerMap', () => {
      const workersMap = WorkersMap.create();

      expect(workersMap).toBeInstanceOf(WorkersMap);
    });
    it ('calling with empty property should create empty instance of WorkerMap', () => {
      const workersMap = WorkersMap.create();
      const gettingEntries = workersMap.entries();

      expect(gettingEntries).toEqual([]);
    });
    it ('should ignore failure worker in getting workers', () => {
      const workersMap = WorkersMap.create(failureWorkers);
      const gettingEntries = workersMap.entries();

      expect(gettingEntries).toEqual([]);
    });
    it ('should not create WorkerMap with duplicate worker', () => {
      const workersMap = WorkersMap.create(workersWithDuplicate);
      const gettingEntries = workersMap.entries();
      const entriesLength = gettingEntries.length;

      expect(entriesLength).toBe(1);
    });
    it ('if workers have duplicate worker`s pare should add only last duplicate', () => {
      const workersMap = WorkersMap.create(workersWithDuplicate);
      const gettingHandler = workersMap.get(action);

      expect(gettingHandler).toBe(anotherHandler);
    });
  });

  describe ('get(action)', () => {
    it('should return handler from worker`s with getting his action', () => {
      const workersMap = WorkersMap.create(workers);

      const gettingHandler = workersMap.get(action);

      expect(gettingHandler).toBe(handler);
    });
    it ('should return null if WorkerMap not consist Worker with getting action', () => {
      const workersMap = WorkersMap.create(workers);

      const gettingWorker = workersMap.get(failureAction);

      expect(gettingWorker).toBeNull();
    });
  });

  describe ('entries()', () => {
    it('should return array of workers`s pare', () => {
      const workersMap = WorkersMap.create(workers);

      const gettingEntries = workersMap.entries();

      expect(gettingEntries).toEqual(workers);
    });
    it('returning array should be independent from WorkersMap', () => {
      const workersMap = WorkersMap.create([]);

      const gettingEntries = workersMap.entries();
      workersMap.set(action, handler);

      expect(gettingEntries).toEqual([]);
    });
  });

  describe ('set(worker)', () => {
    it ('should return relative WorkerMap', () => {
      const workersMap = WorkersMap.create();

      const modifiedWorkerMap = workersMap.set(action, handler);

      expect(modifiedWorkerMap).toBe(workersMap);
    });
    it('should set Worker to WorkersMap ', () => {
      const workersMap = WorkersMap.create();

      workersMap.set(action, handler);
      const gettingHandler = workersMap.get(action);

      expect(gettingHandler).toBe(handler);
    });
    it ('should replace worker if WorkersMap already has worker with getting action', () => {
      const workersMap = WorkersMap.create(workers);

      const oldHandler = workersMap.get(action);
      workersMap.set(action, anotherHandler);
      const newHandler = workersMap.get(action);

      expect(oldHandler).not.toBe(newHandler);
    });
    it ('should not modified WorkerMap if getting uncorrect parameter', () => {
      const workersMap = WorkersMap.create();

      workersMap.set(handler, action);
      const gettingEntries = workersMap.entries();

      expect(gettingEntries).toEqual([]);
    });
  });

  describe ('unset(action)', () => {
    it ('should return relative WorkerMap', () => {
      const workersMap = WorkersMap.create(workers);

      const modifiedWorkerMap = workersMap.unset(action);

      expect(modifiedWorkerMap).toBe(workersMap);
    });
    it('should unset worker with getting action from WorkerMap', () => {
      const workersMap = WorkersMap.create(workers);

      workersMap.unset(action);
      const unsettingAction = workersMap.get(action);

      expect(unsettingAction).toBeNull();
    });
    it ('should not modified WorkersMap if can not find worker with getting action', () => {
      const workersMap = WorkersMap.create(workers);

      workersMap.unset(failureAction);
      const gettingEntries = workersMap.entries();

      expect(gettingEntries).toEqual(workers);
    });
  });
});
