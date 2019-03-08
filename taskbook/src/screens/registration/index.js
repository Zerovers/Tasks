import React from 'react';
import './index.css';

export default class RegPage extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  inputNameOnChange = (e) => {
    this.setState({ name: e.target.value });
  }

  inputEmailOnChange = (e) => {
    this.setState({ email: e.target.value });
  }

  inputPasswordOnChange = (e) => {
    this.setState({ password: e.target.value });
  }

  sendNewUser = () => {
    // fetch('http://localhost:8000/registration?')
    //   .then(res => res.text())
    //   .then((result) => {
    //     console.log(result);
    //     if (result === 'true') {
    //       this.props.history.push('/home');
    //     }
    //   });
    this.props.history.push('/home');
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
        <span>Email:</span>
        <input
          className="input-email"
          value={this.state.email}
          onChange={this.inputEmailOnChange}
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
