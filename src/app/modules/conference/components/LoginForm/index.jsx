import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

class LoginForm extends React.Component {
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
    this.props.onSubmit({
      name: this.state.name,
    });
    event.preventDefault();
  }

  render() {
    const { className } = this.props;
    return (
      <form className={classNames(className, 'login-form')} onSubmit={this.handleSubmit}>
        <p className="login-form-header">
          Вход в систему
        </p>
        <hr />
        <p className="login-form-input">
          <input
            type="text"
            placeholder="Имя пользователя"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </p>
        <p className="login-form-submit">
          <input type="submit" value="Войти" />
        </p>
      </form>
    );
  }
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  className: '',
};

export default LoginForm;
