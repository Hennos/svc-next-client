import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Users from './Users';

import { stateKeys } from '../constants';
import {
  connectPeer,
} from '../actions';

function ConferenceClient({ users, createConnection }) {
  return (
    <div className="client">
      <Users users={users} onChooseUser={createConnection} />
    </div>
  );
}

ConferenceClient.propTypes = {
  users: PropTypes.object.isRequired,
  createConnection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.conference.get(stateKeys.users).toObject(),
});

const mapDispatchToProps = dispatch => ({
  createConnection: user => dispatch(connectPeer(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceClient);
