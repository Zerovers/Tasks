import './index.css';
import React from 'react';
import { withRouter } from "react-router-dom";

import './images/background_loginscreen.jpg';

class LoginScreen extends React.Component {
  state = {
    inputValue: '',
  }

  onInputChange = (e) => {
    this.setState({ 
      inputValue: e.target.value,
     });
  }

  onKeyPress = (e) => {
    if(e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    this.props.selectPlayerName(this.state.inputValue);
    this.props.history.push('/BattleArena');
  }

  onInputSubmit = (e) => {
    e.preventDefault();
    this.props.selectPlayerName(this.state.inputValue);
    this.props.history.push('/BattleArena');
  }


  render() {
    console.log(this.props.playerName);
    return (
      <div className='login-background'>
        <div className='login'>
          <p>Битва за Торезан</p>
          <header>Спасите мир!</header>
          <form className='login__content' onSubmit={this.onInputSubmit}>
            <label htmlFor='nickname'>Your nickname</label>
            <input 
              type='text'
              id='login__content__input' 
              placeholder='Введите свой никнейм' 
              autoFocus
              autoComplete='off'
              required minLength='1'
              value={this.state.inputValue}
              onChange={this.onInputChange}
              onKeyPress={this.onKeyPress} 
            />
            <button id='login__content__button'>Play</button>
          </form>
        </div>
        <div className='game-description'>
          <div className='game-description__feature'>
              <h4>Особенности</h4>
            <p>
              Присуствует 2 типа заклинаний: Наносящих урон и востанавливающие здоровье. Задачи представленны различными
              математическими и логическими заданиями.
            </p>
          </div>
          <div className='game-description__rule'>
              <h4>Правила</h4>
            <p>
              1. У игрока и монстра 100 хп. <br></br>
              2. Угрок ходит первым и выбирайте действие. <br></br>
              3. Если игрок отвечает правильно, то наносит урон, иначе монстр отвечает ударом <br></br>
              4. Когда монстр умирает появляется следующий монст с большим уроном <br></br>
              5. После поражения отображается статистика. <br></br >
            </p >
          </div >
          <div className='game-description__controll'>
              <h4>Управление</h4>
            <p>
              1. Мышкой <br></br>
              - Выбирайте нужное действие <br></br>
              - Вписывайте ответ<br></br >
              - Отправляйте ответ!<br></br >
              2. Клавиатурой<br></br >
              - Переключайтесь между элементами клавишей TAB <br></br >
              - Выбирайте дейсвтие клавишей SPACE <br></br >
              - вписывайте ответ и отвечайте клавишей ENTER
            </p >
          </div >
        </div >
        </div>
    )
  }
}
export default withRouter(LoginScreen);
