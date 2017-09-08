import configurateModule from '../utils/configurateModule';
import component from './component';
import reducer from './reducer';
import stories from './stories';
import { events, stateKeys } from './constants';

// todo: очень много писанины, необходимо по максимуму ужать до лаконичного api
export default configurateModule([{
  type: 'component',
  body: component,
}, {
  type: 'reducer',
  body: reducer,
}, {
  type: 'saga',
  body: stories,
}]);
