import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  as Router, Switch, Route } from 'react-router-dom';
import LoginScreen from '../login';
import BattleArena from '../battle';
import HomeScreen from '../home';

class App extends React.Component {
  state = {
    playerName: '',
  }

  selectPlayerName = (name) => {
    this.setState({ playerName: name })
  }

  render() {
    return (  
      <Router>
        <Switch>
          <Route exact path='/BattleForTorezanReact/login' component={() => <LoginScreen selectPlayerName={this.selectPlayerName} />} />
          <Route exact path='/BattleForTorezanReact/BattleArena' component={() => <BattleArena playerName={this.state.playerName} />} />
          <Route exact path='/BattleForTorezanReact' component={ () => <HomeScreen />} />
        </Switch>
      </Router>
    )
  }
}
ReactDOM.render(<App />, document.querySelector('.app-root'));