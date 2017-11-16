import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';

import { authorize } from '../../actions';

import LoginForm from '../LoginForm';

function Authorize({ onAuthorize }) {
  return (
    <div className="authorization">
      <LoginForm className="authorization-form" onSubmit={onAuthorize} />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  onAuthorize: client => dispatch(authorize(client)),
});

Authorize.propTypes = {
  onAuthorize: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Authorize);
