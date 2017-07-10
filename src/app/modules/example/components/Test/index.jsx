import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Test({ count, onClick }) {
  return (
    <button className="test-button" onClick={onClick}>
      {(count > 0) ? count : 'Start'}
    </button>
  );
}

Test.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Test;
