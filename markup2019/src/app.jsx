import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HEADER from './components/Header/header';
import Home from './views/Home/home';
import store from './store';
import './index.scss';

/* eslint-disable */
class App extends React.PureComponent {
  render() {
    return (
      <>
      <HEADER />
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Home /> } />
          <Route exact path="/home" component={() => <Home /> } />
          <Route exact path="/info" component={() => <InfoPage /> } />
        </Switch>
      </Router>
      <p>footer</p>
      </>
    )
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>
, document.querySelector('.app-root'));
