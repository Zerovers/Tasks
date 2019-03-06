import React from 'react';

export default class Auth extends React.Component {
  state = {
    login: '',
    password: '',
  }

  inputLoginOnChange = (e) => {
    this.setState({ login: e.target.value });
  }

  inputPasswordOnChange = (e) => {
    this.setState({ password: e.target.value });
  }

  getLogin = () => {
    if (this.state.login === 'admin' && this.state.password === '123') {
      localStorage.setItem('authStatus', 'login');
      localStorage.setItem('admin', 'true');
      this.props.setAuthStatus('true');
    }
  }

  getLogout = () => {
    localStorage.setItem('authStatus', '');
    localStorage.setItem('admin', 'false');
    this.props.setAuthStatus('false');
  }

  login = () => (
    <>
      <input
        type="email"
        value={this.state.login}
        onChange={this.inputLoginOnChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={this.state.password}
        onChange={this.inputPasswordOnChange}
        autoComplete="off"
      />
      <button
        type="button"
        onClick={this.getLogin}
      >
      Войти
      </button>
    </>
  )

  logout = () => (
    <>
      <span>Admin</span>
      <button
        type="button"
        onClick={this.getLogout}
      >
      Выйти
      </button>
    </>
  )

  render() {
    let auth = null;
    if (this.props.authStatus === 'login') {
      auth = this.logout();
    } else {
      auth = this.login();
    }
    return (
      <>
        {auth}
      </>
    );
  }
}
