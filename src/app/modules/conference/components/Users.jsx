import React from 'react';
import { connect } from 'react-redux';
import { stateKeys } from '../constants';
import {
  connectPeer as connectWithUser,
} from '../actions';

function Users({ users, createConnection }) {
  return (
    <div>{
        Object.keys(users).map(id => (
          <button onClick={() => createConnection(id)} key={id}>{users[id].name}</button>
        ))
    }</div>
  );
}

const mapStateToProps = state => ({
  users: state.conference.get(stateKeys.users).toObject(),
});

const mapDispatchToProps = dispatch => ({
  createConnection: user => dispatch(connectWithUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
