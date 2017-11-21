import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './style.css';

import LoadingIcon from '../LoadingIcon';

import { videoAreaReady } from '../../actions';

const loaded = true;

class Connected extends React.Component {
  constructor(props) {
    super(props);

    this.areaId = `area-${this.props.desc.name}`;
  }

  componentDidMount() {
    this.props.sendReadyVideoArea(this.areaId);
  }

  render() {
    const { className, desc } = this.props;
    return (
      <div className={classNames(className, 'connected')}>
        {loaded ? (
          <video className="area" id={this.areaId} />
        ) : (
          <div className="area">
            <LoadingIcon />
          </div>
        )}
        <hr />
      </div>
    );
  }
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
