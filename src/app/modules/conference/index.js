import configurateModule from '../utils/configurateModule';
import component from './component';

// todo: очень много писанины, необходимо по максимуму ужать до лаконичного api
export default configurateModule([{
  type: 'component',
  body: component,
}]);
