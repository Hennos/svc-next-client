import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authorize } from '../actions';

class Authorize extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    this.props.onAuthorize({
      name: this.state.name,
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="authorization">
        <form onSubmit={this.handleSubmit}>
          <p>Имя: <input type="text" value={this.state.name} onChange={this.handleChange} /></p>
          <p><input type="submit" value="Войти" /></p>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuthorize: client => dispatch(authorize(client)),
});

Authorize.propTypes = {
  onAuthorize: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Authorize);
