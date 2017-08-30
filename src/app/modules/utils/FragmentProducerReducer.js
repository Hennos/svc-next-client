import FragmentProducer from './FragmentProducer';
import WorkersMap from './WorkersMap';

export default class FragmentProducerReducer extends FragmentProducer {
  static create() {
    return new FragmentProducerReducer();
  }

  constructor() {
    super('reducer');
  }

  getProduce(body = {}) {
    if (typeof body !== 'object') {
      throw new TypeError('FragmentProducerReducer => getProduce(body): body must be object');
    }

    const { workers = [], initialState = {} } = body;
    return () => {
      try {
        const workersMap = WorkersMap.create(workers);
        return (state = initialState, action) => {
          const handleAction = workersMap.get('UP_COUNTER');
          if (typeof handleAction === 'function') {
            return handleAction(state, action);
          }
          return state;
        };
      } catch (error) {
        throw new TypeError(`FragmentProducerReducer => getProduce: workers in body => ${error.message}`);
      }
    };
  }
}
