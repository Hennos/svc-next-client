import React from 'react';
import PropTypes from 'prop-types';

function Signal({ className, status }) {
  return <div className={`${className} signal_${status}`} />;
}

Signal.defaultProps = {
  className: '',
};

Signal.propTypes = {
  className: PropTypes.string,
  status: PropTypes.string.isRequired,
};

export default Signal;
