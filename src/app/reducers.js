import { combineReducers } from 'redux';
import modules from './modules';

const Reducers = combineReducers({
  example: modules.example.reducer,
  dataChannel: modules.dataChannel.reducer,
});

export default Reducers;
