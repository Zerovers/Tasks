import React, { Fragment } from 'react';
import { connect } from 'react-redux';

class Auth extends React.Component {
  state = {
    username: '',
    password: ''
  };

  inputLoginOnChange = ({ target }) => {
    this.setState({ username: target.value });
  };

  inputPasswordOnChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const { login } = this.props;
    if (username === 'admin' && password === '123') {
      login();
    }
  };

  handleLogout = () => {
    this.props.logout();
  };

  login = () => {
    const { username, password } = this.state;
    return (
      <React.Fragment>
        <input
          type="email"
          value={username}
          onChange={this.inputLoginOnChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.inputPasswordOnChange}
          autoComplete="off"
        />
        <button type="button" onClick={this.handleLogin}>
          Войти
        </button>
      </React.Fragment>
    );
  };

  logout = () => (
    <>
      <span>Admin</span>
      <button type="button" onClick={this.handleLogout}>
        Выйти
      </button>
    </>
  );

  render() {
    const { authStatus } = this.props;
    const Component = authStatus === 'login' ? this.logout() : this.login();
    return <Fragment>{Component}</Fragment>;
  }
}

export default Auth;
