import './index.css';
import React from 'react';
import { render } from 'react-dom';
import Autocomplete from 'react-autocomplete';
import { getStates, matchStateToTerm, sortStates } from '../../utils/utility';
import Table from '../../components/table';
import data from '../../../data.json';

const _ = require('lodash');

class DashBoard extends React.Component {
  state = {
    inputValue: localStorage.getItem('mentorName'),
    mentorName: localStorage.getItem('mentorName'),
    find: localStorage.getItem('find'),
    auth: localStorage.getItem('auth'),
    authStatus: localStorage.getItem('status') || 'login',
    logout: localStorage.getItem('logout') || '',
  }

  selectMentor = (mentorName) => {
    localStorage.setItem('mentorName', mentorName);
    localStorage.setItem('find', 'true');
    this.setState({ mentorName, find: 'true', auth: 'false' });
  }

  componentDidMount = () => {
    let info;
    if (this.state.authStatus === 'login' && this.state.auth === 'true') {
      fetch('https://rss-dashboard.herokuapp.com')
        .then(res => res.text())
        .then((result) => {
          info = JSON.parse(result);
          if (info.user.gitName !== undefined) {
            localStorage.setItem('mentorName', info.user.gitName.toLowerCase());
            localStorage.setItem('find', 'true');
            localStorage.setItem('auth', 'true');
            localStorage.setItem('status', 'logout');
            localStorage.setItem('logout', 'false');
            this.setState({
              mentorName: info.user.gitName.toLowerCase(),
              inputValue: info.user.gitName.toLowerCase(),
              find: 'true',
              authStatus: 'logout',
            });
          }
        });
    }
    if (this.state.authStatus === 'logout' && this.state.auth === 'true' && this.state.logout === 'true') {
      this.setState({
        mentorName: '',
        inputValue: '',
        auth: 'false',
        find: 'false',
        authStatus: 'login',
      });
      localStorage.setItem('mentorName', '');
      localStorage.setItem('find', 'false');
      localStorage.setItem('auth', 'false');
      localStorage.setItem('status', 'login');
      localStorage.setItem('logout', 'true');
    }
  }

  getAuth = () => {
    localStorage.setItem('auth', 'true');
  }

  getLogout = () => {
    localStorage.setItem('logout', 'true');
  }

  login = () => (
    <a href="https://rss-dashboard.herokuapp.com/auth/github/" onClick={this.getAuth}>
      <i className="fab fa-github" />
      Login
    </a>
  )

  logout = () => (
    <a href="https://rss-dashboard.herokuapp.com/logout" onClick={this.getLogout}>
      <i className="fab fa-github" />
      logout
    </a>
  )

  render() {
    let table = null;
    let authStatus;
    if (this.state.authStatus === 'login') {
      authStatus = this.login();
    } else if (this.state.authStatus === 'logout') {
      authStatus = this.logout();
    }
    const mentorNameList = [];
    data.mentorStudents.map(e => mentorNameList.push(e.mentorGitName));
    if (this.state.find === 'true' && _.indexOf(mentorNameList, this.state.mentorName) !== -1) {
      table = <Table mentorName={this.state.mentorName} />;
    }
    return (
      <>
        <div className="auth">
          <span>Authorization</span>
          {authStatus}
        </div>
        <div className="select-input">
          <span>Ментор:</span>
          <Autocomplete
            value={this.state.inputValue || ''}
            inputProps={{ id: 'states-autocomplete' }}
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
            items={getStates()}
            getItemValue={item => item.name}
            shouldItemRender={matchStateToTerm}
            sortItems={sortStates}
            onChange={(event, inputValue) => this.setState({ inputValue })}
            onSelect={(inputValue) => {
              this.setState({ inputValue });
              this.selectMentor(inputValue);
            }}
            renderMenu={children => (
              <div className="menu">
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                key={item.count}
              >
                {item.name}
              </div>
            )}
          />
          <i className="fas fa-caret-down" />
        </div>
        {table}
      </>
    );
  }
}
render(<DashBoard />, document.querySelector('.app-root'));
