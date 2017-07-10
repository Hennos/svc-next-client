import React from 'react';
import { Route } from 'react-router-dom';
import wrapMatched from './utils/wrapMatched';
import exampleModule from './modules/example';

function Routes() {
  return (
    <div className="routes">
      <Route path="/test" component={wrapMatched(exampleModule.component)} />
    </div>
  );
}

export default Routes;
