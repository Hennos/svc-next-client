import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

function Users({ users, onChooseUser }) {
  return (
    <div className="users">{
        Object.entries(users).map(([id, user]) => (
          <User desc={user} onClick={() => onChooseUser(id)} key={id} />
        ))
    }</div>
  );
}

Users.propTypes = {
  users: PropTypes.object.isRequired,
  onChooseUser: PropTypes.func,
};

Users.defaultProps = {
  onChooseUser: () => {},
};

export default Users;
