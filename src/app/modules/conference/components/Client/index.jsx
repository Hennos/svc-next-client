import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import SideBar from '../SideBar';
import Users from '../Users';
import CallingArea from '../CallingArea';

import './style.css';

import { stateKeys } from '../../constants';
import {
  connectPeer,
} from '../../actions';

function Client({ className, client, connected, users, createConnection }) {
  const connections = connected ? (
    Object.keys(users)
      .filter(id => Object.is(id, connected))
      .map(id => ({
        id,
        ...users[id],
      }))
  ) : [];
  return (
    <div className={classNames(className, 'client')}>
      <SideBar className="client-side-bar" client={client}>
        <Users
          users={users}
          choosed={connected}
          onChooseUser={createConnection}
        />
      </SideBar>
      <CallingArea
        className="client-calling-area"
        connections={connections}
      />
    </div>
  );
}

Client.propTypes = {
  className: PropTypes.string,
  client: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  users: PropTypes.object.isRequired,
  connected: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  createConnection: PropTypes.func.isRequired,
};

Client.defaultProps = {
  className: '',
};

const mapStateToProps = state => ({
  client: state.conference.get(stateKeys.client),
  users: state.conference.get(stateKeys.users).toObject(),
  connected: state.conference.get(stateKeys.connected),
});

const mapDispatchToProps = dispatch => ({
  createConnection: user => dispatch(connectPeer(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
