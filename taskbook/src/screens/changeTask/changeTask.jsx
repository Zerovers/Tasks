import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as DataActions from '../../actions/loadData';
import './index.css';

const md5 = require('js-md5');

class ChangeFiles extends React.Component {
  state = {
    data: '',
    inputValue: '',
    isChecked: ''
  };

  onCheckboxChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  onInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  getBackToPage = () => {
    this.props.history.goBack();
  };

  onChangeFile = () => {
    const isCheckedNumber = this.state.isChecked ? '10' : '0';
    const encode = string =>
      encodeURIComponent(string).replace(
        /[!'()*]/g,
        c =>
          `%${c
            .charCodeAt(0)
            .toString(16)
            .toUpperCase()}`
      );
    const paramsString = `${encode('status')}=${encode(
      isCheckedNumber
    )}&${encode('text')}=${encode(this.state.inputValue)}&${encode(
      'token'
    )}=${encode('beejee')}`;
    const hashParamsString = md5(paramsString);
    const body = new FormData();
    body.append('status', isCheckedNumber);
    body.append('text', this.state.inputValue);
    body.append('token', 'beejee');
    body.append('signature', hashParamsString);
    const config = {
      method: 'POST',
      body
    };
    fetch(
      `https://uxcandy.com/~shapoval/test-task-backend/edit/${this.props.history.location.pathname.replace(
        /[^\d;]/g,
        ''
      )}?developer=Zerover`,
      config
    )
      .then(res => res.text())
      .then(() => {
        this.props.history.goBack();
      });
  };

  componentDidMount = () => {
    this.setState({
      data: {
        ...this.props.data.tasks.find(
          e =>
            e.id == this.props.history.location.pathname.replace(/[^\d;]/g, '')
        )
      },
      isChecked: this.props.data.status === 10,
      inputValue: this.props.data.tasks.find(
        e => e.id == this.props.history.location.pathname.replace(/[^\d;]/g, '')
      ).text
    });
  };

  render() {
    console.log('changeTask', this.props, this.state);
    return (
      <>
        <div className="task-change">
          <textarea
            className="input-text"
            value={this.state.inputValue}
            onChange={this.onInputChange}
          />
          <span>Выполнено?</span>
          <input
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.onCheckboxChange}
          />
          <button
            className="button_save"
            type="button"
            onClick={this.onChangeFile}
          >
            Сохранить
          </button>
          <button type="button" onClick={this.getBackToPage}>
            Отмена
          </button>
        </div>
      </>
    );
  }
}
const ChangeFilesRoute = withRouter(ChangeFiles);

const mapStateToProps = ({ data, auth: { authStatus, admin } }) => ({
  data,
  authStatus,
  admin
});

const mapDispatchToProps = dispatch => ({
  loadData: (...arg) => dispatch(DataActions.loadData(...arg))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeFilesRoute);
