import { combineReducers } from 'redux';
import modules from './modules';

const Reducers = combineReducers({
  example: modules.example.reducer,
  conference: modules.conference.reducer,
});

export default Reducers;
