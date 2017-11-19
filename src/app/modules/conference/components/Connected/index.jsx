import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

import LoadingIcon from '../LoadingIcon';

const loading = true;

function Connected({ className, desc }) {
  return (
    <div className={classNames(className, 'connected')}>
      {loading && (
        <div className="loading-area">
          <LoadingIcon />
        </div>
      )}
      <video>
        <source src="" />
      </video>
      <hr />
    </div>
  );
}

Connected.propTypes = {
  className: PropTypes.string,
  desc: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

Connected.defaultProps = {
  className: '',
};

export default Connected;
