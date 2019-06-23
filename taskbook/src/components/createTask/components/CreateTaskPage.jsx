import React from 'react';
import '../css/index.css';

class CreateTaskPage extends React.Component {
  state = {
    valueLogin: '',
    valueEmail: '',
    valueText: ''
  };

  onChangeInputLogin = e => {
    this.setState({ valueLogin: e.target.value });
  };

  onChangeInputEmail = e => {
    this.setState({ valueEmail: e.target.value });
  };

  onChangeInputText = e => {
    this.setState({ valueText: e.target.value });
  };

  handlePressButton = () => {
    const { createTask } = this.props;
    const data = {
      name: this.state.valueLogin,
      email: this.state.valueEmail,
      text: this.state.valueText
    };
    createTask(data);
    this.props.history.push('/home');
  };

  render() {
    console.log(this.props);
    return (
      <>
        <div className="addFiles-content">
          <span>Login:</span>
          <input
            className="input-login"
            value={this.state.valueLogin}
            onChange={this.onChangeInputLogin}
          />
          <span>Email:</span>
          <input
            className="input-emal"
            value={this.state.valueEmail}
            onChange={this.onChangeInputEmail}
          />
          <span>Text:</span>
          <textarea
            className="input-text"
            value={this.state.valueText}
            onChange={this.onChangeInputText}
          />
          <button
            className="button-task"
            type="button"
            onClick={this.handlePressButton}
          >
            Отправить
          </button>
        </div>
      </>
    );
  }
}

export default CreateTaskPage;
