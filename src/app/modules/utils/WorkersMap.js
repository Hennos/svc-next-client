import Worker from './Worker';

export default class WorkersMap {
  // todo исключить возможность появления дупликатов при создании/добавлении worker-ов

  constructor() {
    this.workers = [];
  }

  static create(workers = []) {
    if (!Array.isArray(workers)) {
      throw new TypeError('WorkersMap: workers must be array');
    }
    return workers.reduce(
      (preMap, [action, handler]) => preMap.set(action, handler),
      new WorkersMap(),
    );
  }

  get(action) {
    const findingWorker = this.workers.find(worker => worker.is(action));
    return findingWorker ? findingWorker.getHandler() : null;
  }

  entries() {
    return this.workers.map(worker => worker.getPare());
  }

  set(action, handler) {
    this.unset(action);
    try {
      const addingWorker = Worker.create(action, handler);
      this.workers.push(addingWorker);
    } catch (error) {
      console.error(error.message);
    }
    return this;
  }

  unset(action) {
    this.workers = this.workers.filter(worker => !worker.is(action));
    return this;
  }
}
