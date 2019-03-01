import './index.css';
import React from 'react';

let DISABLE_BUTTON = '';
let DISABLE_CROSS = '';
export default class TableScore extends React.Component {
  state = {
    disable: '',
    loading: false,
  }

  renderScoreMainPage = () => {
    const config = {
      method: 'POST',
    };
    fetch(' https://battlefortorezan.herokuapp.com/mainPage/', config)
      .then(res => res.text())
      .then((result) => { const info = JSON.parse(result); return info; })
      .then((info) => {
        this.setState({ disable: ' disable', loading: true });
        for (let i = 0; i < info.length; i += 1) {
          $('tr')[i + 1].childNodes[0].innerHTML = `${i + 1}`;
          $('tr')[i + 1].childNodes[1].innerHTML = `${info[i].username}`;
          $('tr')[i + 1].childNodes[2].innerHTML = `${info[i].countMonster}`;
        }
      });
  }

  renderScoreAfterGameOver = () => {
    this.setState({ disable: ' disable', loading: true });
    const body = {
      username: `${this.props.playerName}`,
      countMonster: `${this.props.countMonsters}`,
    };
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    fetch('https://battlefortorezan.herokuapp.com/', config)
      .then(res => res.text())
      .then((result) => { const info = JSON.parse(result); return info; })
      .then((info) => {
          for (let i = 0; i < info.length; i += 1) {
          $('tr')[i + 1].childNodes[0].innerHTML = `${i + 1}`;
          $('tr')[i + 1].childNodes[1].innerHTML = `${info[i].username}`;
          $('tr')[i + 1].childNodes[2].innerHTML = `${info[i].countMonster}`;
        }
      });
  }

  render() {
    if (this.state.loading === false && this.props.stateBattle === 'gameOver') {
      DISABLE_CROSS = ' disable';
      this.renderScoreAfterGameOver();
    } else if (this.state.loading === false) {
      DISABLE_BUTTON = ' disable';
      this.renderScoreMainPage();
    } 
    return (
      <div className='score__content'>
        <div className={'state-loading' + (this.state.disable)}>
          <p>Загружаем список героев</p>
          <div className='sk-fading-circle'>
            <div className='sk-circle sk-circle-1'></div>
            <div className='sk-circle sk-circle-2'></div>
            <div className='sk-circle sk-circle-3'></div>
            <div className='sk-circle sk-circle-4'></div>
            <div className='sk-circle sk-circle-5'></div>
            <div className='sk-circle sk-circle-6'></div>
            <div className='sk-circle sk-circle-7'></div>
            <div className='sk-circle sk-circle-8'></div>
            <div className='sk-circle sk-circle-9'></div>
            <div className='sk-circle sk-circle-10'></div>
            <div className='sk-circle sk-circle-11'></div>
            <div className='sk-circle sk-circle-12'></div>
          </div>
        </div>
        <div className={'score__content__wrapper' + (DISABLE_CROSS)}>
          <div className='score__content__close' onClick={this.props.closeTableScore}><i className="fas fa-times"></i></div>
        </div>
        <table>
          <caption>Таблица рекордов</caption>
          <tbody>
            <tr>
              <th className='firstCol'>#</th>
              <th>Имя героя</th>
              <th>Побежденно монстров</th>
            </tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
          </tbody>
        </table>
        <button 
          className={'score__button__resetGame' + (DISABLE_BUTTON)}
          onClick={this.props.resetGame}
        >Начать с начала</button>
      </div>
    )
  }
}