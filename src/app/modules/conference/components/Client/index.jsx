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

function Client({ className, client, users, createConnection }) {
  return (
    <div className={classNames(className, 'client')}>
      <SideBar className="client-side-bar" client={client}>
        <Users users={users} onChooseUser={createConnection} />
      </SideBar>
      <CallingArea className="client-calling-area" />
    </div>
  );
}

Client.propTypes = {
  className: PropTypes.string,
  client: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  users: PropTypes.object.isRequired,
  createConnection: PropTypes.func.isRequired,
};

Client.defaultProps = {
  className: '',
};

const mapStateToProps = state => ({
  client: state.conference.get(stateKeys.client),
  users: state.conference.get(stateKeys.users).toObject(),
});

const mapDispatchToProps = dispatch => ({
  createConnection: user => dispatch(connectPeer(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
