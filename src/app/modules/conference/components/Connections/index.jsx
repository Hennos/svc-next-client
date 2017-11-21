import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

import Connected from '../Connected';

function Connections({ className, connections }) {
  return (
    <div className={classNames(className, 'connections')}>{
      connections.map(({ id, ...desc }) => (
        <Connected className="connections-elements" desc={desc} key={id} />
      ))
    }</div>
  );
}

Connections.propTypes = {
  className: PropTypes.string,
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
};

Connections.defaultProps = {
  className: '',
};

export default Connections;
