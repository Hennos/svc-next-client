import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { events, stateKeys } from './constants';
import { createConnection } from './actions';
import createSignal from './components/createSignal';
import './style.css';

function DataChannel({ status, setConnection }) {
  const CurrentSignal = createSignal(status);
  return (
    <div className="data_channel">
      <button onClick={() => setConnection()}>
        <CurrentSignal />
      </button>
    </div>
  );
}

DataChannel.propTypes = {
  status: PropTypes.string.isRequired,
  setConnection: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setConnection: () => dispatch({ type: events.createConnection }),
});

// todo: косяк, жестко защита структура хранилища, зависимость от внешнего устройства.
const mapStateToProps = state => ({
  status: state.dataChannel.get(stateKeys.status),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataChannel);
