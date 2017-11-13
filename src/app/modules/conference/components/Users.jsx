import React from 'react';
import PropTypes from 'prop-types';

function Users({ users, onChooseUser }) {
  return (
    <div className="users">{
        Object.entries(users).map(([id, user]) => (
          <button onClick={() => onClick(id)} key={id}>{user.name}</button>
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
