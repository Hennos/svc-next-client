import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

function User({ className, desc, onChoose }) {
  return (
    <div className={classNames(className, 'user')} role="button" onClick={() => {}} >
      <p>{desc.name}</p>
    </div>
  );
}

User.propTypes = {
  className: PropTypes.string,
  desc: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onChoose: PropTypes.func,
};

User.defaultProps = {
  className: '',
  onChoose: () => {},
};

export default User;
