import './index.css';
import React from 'react';

export default class PazzleTask extends React.Component {
  state = {
    inputValue: '',
    taskData: this.props.taskData.rndKeys,
    answer: this.props.taskData.answer,
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
    if(this.state.inputValue + '' === this.state.answer + '') {
      this.props.resultBattle('playerHeal', '')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack', '')
      this.props.selectAction('')
    }
    e.preventDefault();
  }

  onInputSubmit = (e) => {
    if(this.state.inputValue + '' === this.state.answer + '') {
      this.props.resultBattle('playerHeal', '')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack', '')
      this.props.selectAction('')
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className='pazzle-content'>
        <p className='pazzle-content__text'>Отгадайте загадку<br></br> {this.state.taskData}</p>
        <form className='pazzle-form' onSubmit={this.onInputSubmit}>
          <input 
            type='text' 
            id='pazzle-form__input' 
            autoFocus
            autoComplete='off'
            required minLength='1'
            value={this.state.inputValue}
            onChange={this.onInputChange}
            onKeyPress={this.onKeyPress}
             />
          <button id='pazzle-form__button'>Ответить</button>
        </form>
      </div>
    )
  }
}
