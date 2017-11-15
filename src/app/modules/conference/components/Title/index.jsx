import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

function Title({ className, client: { name } }) {
  return (
    <div className={classNames(className, 'title')}>
      <p>{name}</p>
    </div>
  );
}

Title.propTypes = {
  className: PropTypes.string,
  client: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

Title.defaultProps = {
  className: '',
};

export default Title;
