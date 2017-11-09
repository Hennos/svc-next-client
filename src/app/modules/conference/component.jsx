import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { stateKeys } from './constants';
import Authorize from './components/Authorize';
import ConferenceClient from './components/ConferenceClient';

function ConferenceApp({ match, authorized }) {
  return (
    <Switch>
      <Redirect exact from={match.url} to={`${match.url}/authorized`} />
      <Route
        path={`${match.url}/authorize`}
        render={props => (
          !authorized ? (
            <Authorize {...props} />
          ) : (
            <Redirect to={{
              pathname: `${match.url}/authorized`,
              state: { from: props.location },
            }}/>
          )
        )}
      />
      <Route
        path={`${match.url}/authorized`}
        render={props => (
          authorized ? (
            <ConferenceClient {...props} />
          ) : (
            <Redirect to={{
              pathname: `${match.url}/authorize`,
              state: { from: props.location },
            }}/>
          )
        )}
      />
    </Switch>
  );
}

ConferenceApp.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  authorized: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authorized: state.conference.get(stateKeys.authorized),
});

export default withRouter(connect(mapStateToProps)(ConferenceApp));
