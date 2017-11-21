import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

function User({ className, desc, choosed, onChoose }) {
  return (
    <div
      className={classNames(className, 'user', { 'user-choosed': choosed })}
      role="button"
      onClick={onChoose}
    >
      <p>{desc.name}</p>
    </div>
  );
}

User.propTypes = {
  className: PropTypes.string,
  desc: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  choosed: PropTypes.bool,
  onChoose: PropTypes.func,
};

User.defaultProps = {
  className: '',
  choosed: false,
  onChoose: () => {},
};

export default User;
