import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stateKeys } from './constants';
import Test from './components/Test';
import { startTimer } from './actions';

function Example({ count, onTestButtonClick }) {
  return (
    <div className="test-view">
      <Test count={count} onClick={onTestButtonClick} />
    </div>
  );
}

Example.propTypes = {
  count: PropTypes.number.isRequired,
  onTestButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onTestButtonClick: () => dispatch(startTimer()),
});

const mapStateToProps = state => ({
  count: state.example.get(stateKeys.count),
});

export default connect(mapStateToProps, mapDispatchToProps)(Example);
