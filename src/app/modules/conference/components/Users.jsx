import React from 'react';
import PropTypes from 'prop-types';

function Users({ users, onClick }) {
  return (
    <div>{
        Object.entries(users).map(([id, user]) => (
          <button onClick={() => onClick(id)} key={id}>{user.name}</button>
        ))
    }</div>
  );
}

Users.propTypes = {
  users: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

Users.defaultProps = {
  onClick: () => {},
};

export default Users;
