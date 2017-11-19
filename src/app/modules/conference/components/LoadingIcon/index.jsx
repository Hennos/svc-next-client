import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

function LoadingIcon({ className }) {
  return (
    <div className={classNames(className, 'loading-icon')}>
      <span className="icon" />
    </div>
  );
}

LoadingIcon.propTypes = {
  className: PropTypes.string,
};

LoadingIcon.defaultProps = {
  className: '',
};

export default LoadingIcon;
