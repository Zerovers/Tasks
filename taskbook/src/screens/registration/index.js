import React from 'react';
import './index.css';

export default class RegPage extends React.Component {
  state = {
    name: '',
    password: '',
  }

  inputNameOnChange = (e) => {
    this.setState({ name: e.target.value });
  }

  inputPasswordOnChange = (e) => {
    this.setState({ password: e.target.value });
  }

  sendNewUser = () => {
    if (this.state.password.length > 0) {
      fetch(`http://localhost:8000/registration?login=${this.state.name}&password=${this.state.password}`)
        .then(res => res.text())
        .then((result) => {
          console.log(result);
          if (result === 'true') {
            this.props.history.push('/home');
          }
        });
    } else {
      console.log('password < 1');
    }
  };

  render() {
    return (
      <div className="reg-content">
        <span>Login:</span>
        <input
          className="input-name"
          value={this.state.name}
          onChange={this.inputNameOnChange}
        />
        <span>Password:</span>
        <input
          className="input-password"
          required
          minLength="1"
          autoComplete="off"
          value={this.state.password}
          onChange={this.inputPasswordOnChange}
        />
        <button
          className="button_reg"
          type="button"
          onClick={this.sendNewUser}
        >
        Зарегистрироваться
        </button>
      </div>
    );
  }
}
