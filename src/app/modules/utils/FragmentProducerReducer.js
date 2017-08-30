import FragmentProducer from './FragmentProducer';
import WorkersMap from './WorkersMap';

export default class FragmentProducerReducer extends FragmentProducer {
  static create() {
    return new FragmentProducerReducer();
  }

  constructor() {
    super('reducer');
  }

  getProduce({ workers = [], initialState = {} }) {
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
        throw new TypeError(`FragmentProducerReducer: workers in body => ${error.message}`);
      }
    };
  }
}
