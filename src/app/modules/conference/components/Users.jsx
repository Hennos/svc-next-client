import React from 'react';
import { connect } from 'react-redux';
import { stateKeys } from '../constants';

function Users({ users }) {
  return (
    <div>{
      users.map(user => (
        <div key={user}>{user.name}</div>
      ))
    }</div>
  );
}

const mapStateToProps = state => ({
  users: state.conference.get(stateKeys.users).toArray(),
});

export default connect(mapStateToProps)(Users);
