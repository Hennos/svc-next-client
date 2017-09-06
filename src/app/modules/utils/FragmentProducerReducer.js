import FragmentProducer from './FragmentProducer';
import WorkersMap from './WorkersMap';

export default class FragmentProducerReducer extends FragmentProducer {
  static create() {
    return new FragmentProducerReducer();
  }

  produce(body = {}) {
    if (typeof body !== 'object') {
      throw new TypeError('FragmentProducerReducer => produce(body): body must be object');
    }
    try {
      const { workers = [], initialState = {} } = body;
      const workersMap = WorkersMap.create(workers);
      return (state = initialState, action) => {
        const { type } = action;
        // const handleAction = workersMap.get('UP_COUNTER');
        const handleAction = workersMap.get(type);
        if (typeof handleAction === 'function') {
          return handleAction(state, action);
        }
        return state;
      };
    } catch (error) {
      throw new TypeError(`FragmentProducerReducer => produce(body): workers in body => ${error.message}`);
    }
  }
}
