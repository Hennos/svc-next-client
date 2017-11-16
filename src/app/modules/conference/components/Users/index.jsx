import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import User from '../User';

import './style.css';

function Users({ className, users, onChooseUser }) {
  return (
    <div className={classNames(className, 'users')}>{
        Object.entries(users).map(([id, user]) => (
          <User className="users-element" desc={user} onClick={() => onChooseUser(id)} key={id} />
        ))
    }</div>
  );
}

Users.propTypes = {
  className: PropTypes.string,
  users: PropTypes.object.isRequired,
  onChooseUser: PropTypes.func,
};

Users.defaultProps = {
  className: '',
  onChooseUser: () => {},
};

export default Users;
