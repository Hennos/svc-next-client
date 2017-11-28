import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './style.css';

import LoadingIcon from '../LoadingIcon';

import { videoAreaReady } from '../../actions';

function Connected({ className, desc }) {
  return (
    <div className={classNames(className, 'connected')}>
      {(desc.url) ? (
        <video
          className="area"
          src={desc.url}
        />
      ) : (
        <div className="area">
          <LoadingIcon />
        </div>
      )}
      <hr />
    </div>
  );
}

Connected.propTypes = {
  className: PropTypes.string,
  desc: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  sendReadyVideoArea: PropTypes.func.isRequired,
};

Connected.defaultProps = {
  className: '',
};

const mapDispatchToProps = dispatch => ({
  sendReadyVideoArea: videoId => dispatch(videoAreaReady(videoId)),
});

export default connect(null, mapDispatchToProps)(Connected);
