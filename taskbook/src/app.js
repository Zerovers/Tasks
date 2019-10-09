import './index.css';
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './screens/home/home';
import RegPage from './screens/registration/registration';
import Auth from './components/auth/containers/Auth';
import ChangeFilesRoute from './screens/changeTask/changeTask';
import loadData from './actions/loadData';
import CreateTaskPage from './components/createTask/containers/CreateTaskPage';

const store = configureStore({}, history);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const url =
      'https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=1';
    fetch(url)
      .then(res => res.text())
      .then(result => {
        const data = JSON.parse(result).message;
        dispatch(loadData(data));
      });
  }, []);

  return (
    <Router>
      <>
        <div className="wrapper-nav">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/home" className="navbar-brand">
              Taskbook
            </Link>
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
                <Link to="/home" className="nav-item nav-link">
                  Home
                </Link>
                <Link to="/registration" className="nav-item nav-link">
                  Reg
                </Link>
                <Link to="/addfiles" className="nav-item nav-link">
                  Add Files
                </Link>
              </div>
            </div>
            <div className="auth">{<Auth />}</div>
          </nav>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/registration" component={RegPage} />
          <Route exact path="/addfiles" component={CreateTaskPage} />
          <Route path="/edit" component={ChangeFilesRoute} />
        </Switch>
      </>
    </Router>
  );
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.app-root')
);
