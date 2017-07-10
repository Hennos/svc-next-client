import { combineReducers } from 'redux';
import exampleModule from './modules/example';

const Reducers = combineReducers({
  example: exampleModule.reducer,
});

export default Reducers;
