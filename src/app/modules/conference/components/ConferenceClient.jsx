import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Users from './Users';

function ConferenceClient() {
  return (
    <div>
      <Users />
    </div>
  );
}

export default connect()(ConferenceClient);
