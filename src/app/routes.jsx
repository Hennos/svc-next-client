import React from 'react';
import { Route } from 'react-router-dom';
import wrapMatched from './utils/wrapMatched';
import modules from './modules';

function Routes() {
  return (
    <div className="routes">
      <Route path="/test" component={wrapMatched(modules.example.component)} />
      <Route path="/connection" component={wrapMatched(modules.dataChannel.component)} />
    </div>
  );
}

export default Routes;
