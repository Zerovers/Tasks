import React from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';

const md5 = require('js-md5');

class ChangeFiles extends React.Component {
  state = {
    inputValue: this.props.targetData.text,
    isChecked: '',
  }

  onCheckboxChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  onInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  onChangeFile = () => {
    let isCheckedNumber = '0';
    if (this.state.isChecked) {
      isCheckedNumber = '10';
    }
    const encode = string => encodeURIComponent(string).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
    const paramsString = `${encode('status')}=${encode(isCheckedNumber)}&${encode('text')}=${encode(this.state.inputValue)}&${encode('token')}=${encode('beejee')}`;
    const hashParamsString = md5(paramsString);
    const body = new FormData();
    body.append('status', isCheckedNumber);
    body.append('text', this.state.inputValue);
    body.append('token', 'beejee');
    body.append('signature', hashParamsString);
    const config = {
      method: 'POST',
      body,
    };
    fetch(`https://uxcandy.com/~shapoval/test-task-backend/edit/${this.props.targetData.id}?developer=Zerover`, config)
      .then(res => res.text())
      .then(() => {
        this.props.history.goBack();
      });
  }

  getBackToPage = () => {
    this.props.history.goBack();
  }

  componentDidMount = () => {
    if (this.props.targetData.status === 0) {
      this.setState({ isChecked: false });
    } else {
      this.setState({ isChecked: true });
    }
  }

  render() {
    return (
      <>
        <div className="task-change">
          <textarea
            className="input-text"
            value={this.state.inputValue}
            onChange={this.onInputChange}
          />
          <span>Выполнено?</span>
          <input type="checkbox" checked={this.state.isChecked} onChange={this.onCheckboxChange} />
          <button
            className="button_save"
            type="button"
            onClick={this.onChangeFile}
          >
          Сохранить
          </button>
          <button
            type="button"
            onClick={this.getBackToPage}
          >
            Отмена
          </button>
        </div>
      </>
    );
  }
}
const ChangeFilesRoute = withRouter(ChangeFiles);
export default ChangeFilesRoute;
