import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

import Connections from '../Connections';

function CallingArea({ className, connections }) {
  return (
    <div className={classNames(className, 'calling-area')}>{
      connections.length ? (
        <Connections className="calling-area-connections" connections={connections} />
      ) : (
        <p className="calling-area-placeholder">
          Выберите собеседника из списка активных пользователей
        </p>
      )
    }</div>
  );
}

CallingArea.propTypes = {
  className: PropTypes.string,
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
};

CallingArea.defaultProps = {
  className: '',
};

export default CallingArea;
