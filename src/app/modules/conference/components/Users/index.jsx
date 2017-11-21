import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import User from '../User';

import './style.css';

function Users({ className, users, choosed, onChooseUser }) {
  return (
    <div className={classNames(className, 'users')}>{
        Object.entries(users).map(([id, user]) => (
          <User
            className="users-element"
            desc={user}
            choosed={choosed && Object.is(id, choosed) && !!choosed}
            onChoose={() => onChooseUser(id)}
            key={id}
          />
        ))
    }</div>
  );
}

Users.propTypes = {
  className: PropTypes.string,
  users: PropTypes.object.isRequired,
  choosed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChooseUser: PropTypes.func,
};

Users.defaultProps = {
  className: '',
  choosed: false,
  onChooseUser: () => {},
};

export default Users;
