import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './style.css';

function CallingArea({ className }) {
  return (
    <div className={classNames('calling-area', className)} />
  );
}

CallingArea.propTypes = {
  className: PropTypes.string,
};

CallingArea.defaultProps = {
  className: '',
};

export default CallingArea;
