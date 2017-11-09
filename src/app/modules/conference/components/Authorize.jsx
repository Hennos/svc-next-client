import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authorize } from '../actions';

function Authorize({ onAuthorize }) {
  return (
    <div className="authorization">
      <form onSubmit={onAuthorize}>
        <p>Имя: <input type="text" name="client" /></p>
        <p><input type="submit" value="Войти" /></p>
      </form>
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
