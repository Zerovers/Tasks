import './index.css';
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import HomePageRoute from './screens/home/home';
import RegPage from './screens/registration/registration';
import AddFile from './screens/addFile/addFile';
import Auth from './components/auth';
import ChangeFilesRoute from './screens/changeTask/changeTask';
import store from './store';
import loadData from './actions/loadData';

const mainPage = props => () => (
  <HomePageRoute
    admin={props.admin}
    load={props.load}
    getTargetData={props.getTargetData}
    history={props.history}
  />
);

const changeTasks = props => () => (
  <ChangeFilesRoute
    admin={props.admin}
    targetData={props.targetData}
  />
);

class App extends React.Component {
  state = {
    authStatus: localStorage.getItem('authStatus') || '',
    admin: localStorage.getItem('admin') || 'false',
    appData: '',
    load: '',
    targetData: '',
  }

  getTargetData = (data) => {
    this.setState({ targetData: data });
  }

  setAuthStatus = (status) => {
    if (status === 'true') {
      this.setState({ authStatus: 'login', admin: 'true' });
    } else {
      this.setState({ authStatus: 'logout', admin: 'false' });
    }
  }

  componentDidMount = () => {
    const url = 'https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=1';
    fetch(url)
      .then(res => res.text())
      .then((result) => {
        store.dispatch(loadData(JSON.parse(result).message));
      });
  }

  render() {
    const auth = <Auth setAuthStatus={this.setAuthStatus} authStatus={this.state.authStatus} />;
    const props = {
      admin: this.state.admin,
      appData: this.state.appData,
      load: this.state.load,
      getTargetData: this.getTargetData,
      targetData: this.state.targetData,
      history: this.props.history,
    };
    const homePage = mainPage(props);
    const changeTask = changeTasks(props);
    return (
      <Router>
        <>
          <div className="wrapper-nav">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/home" className="navbar-brand">Taskbook</Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link to="/home" className="nav-item nav-link">Home</Link>
                  <Link to="/registration" className="nav-item nav-link">Reg</Link>
                  <Link to="/addfiles" className="nav-item nav-link">Add Files</Link>
                </div>
              </div>
              <div className="auth">
                {auth}
              </div>
            </nav>
          </div>
          <Switch>
            <Route exact path="/" component={homePage} />
            <Route exact path="/home" component={homePage} />
            <Route exact path="/registration" component={RegPage} />
            <Route exact path="/addfiles" component={AddFile} />
            <Route path="/edit" component={changeTask} />
          </Switch>
        </>
      </Router>
    );
  }
}
render(<Provider store={store}><App /></Provider>, document.querySelector('.app-root'));
