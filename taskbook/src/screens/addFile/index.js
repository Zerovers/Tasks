import React from 'react';
import './index.css';

export default class AddFile extends React.Component {
  state = {
    valueLogin: '',
    valueEmail: '',
    valueText: '',
  }

  onChangeInputLogin = (e) => {
    this.setState({ valueLogin: e.target.value });
  }

  onChangeInputEmail = (e) => {
    this.setState({ valueEmail: e.target.value });
  }

  onChangeInputText = (e) => {
    this.setState({ valueText: e.target.value });
  }

  onCreateTask = () => {
    const form = new FormData();
    form.append('username', `${this.state.valueLogin}`);
    form.append('email', `${this.state.valueEmail}`);
    form.append('text', `${this.state.valueText}`);
    const config = {
      crossDomain: true,
      method: 'POST',
      mimeType: 'multipart/form-data',
      contentType: false,
      processData: false,
      body: form,
      dataType: 'json',
    };
    fetch('https://uxcandy.com/~shapoval/test-task-backend/create?developer=Zerover', config)
      .then(res => res.text())
      .then((result) => {
        this.setState({
          valueLogin: '',
          valueEmail: '',
          valueText: '',
        });
        console.log(JSON.parse(result));
      });
  }

  render() {
    return (
      <>
        <div className="addFiles-content">
          <label>
            Login:
            <input
              className="input-login"
              value={this.state.valueLogin}
              onChange={this.onChangeInputLogin}
            />
          </label>
          <label>
            Email:
            <input
              className="input-emal"
              value={this.state.valueEmail}
              onChange={this.onChangeInputEmail}
            />
          </label>
          <label>
            Text:
            <textarea
              className="input-text"
              value={this.state.valueText}
              onChange={this.onChangeInputText}
            />
          </label>
          <button
            className="button-task"
            type="button"
            onClick={this.onCreateTask}
          >
          Отправить
          </button>
        </div>
      </>
    );
  }
}
