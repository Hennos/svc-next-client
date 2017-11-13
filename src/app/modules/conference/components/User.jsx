import React from 'react';
import PropTypes from 'prop-types';

function User({ desc, onChoose }) {
  return (
    <div className="user">
      <button onClick={onChoose}>{desc.name}</button>
    </div>
  );
}

User.propTypes = {
  desc: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onChoose: PropTypes.func,
};

User.defaultProps = {
  onChoose: () => {},
};

export default User;
