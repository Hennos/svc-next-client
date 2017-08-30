function examineWorkerProps(action, handler) {
  const isCorrectAction = (action === undefined) || (typeof action !== 'string');
  const isCorrectHandler = (handler === undefined) || (typeof handler !== 'function');
  if (isCorrectAction) {
    throw new TypeError('Worker: action must be string');
  }
  if (isCorrectHandler) {
    throw new TypeError('Worker: handler must be function');
  }
  return true;
}

export default class Worker {
  constructor(action, handler) {
    examineWorkerProps(action, handler);

    this.is = examine => Object.is(action, examine);
    this.getHandler = () => handler;
    this.getPare = () => [action, handler];
  }

  static create(action, handler) {
    return new Worker(action, handler);
  }
}
