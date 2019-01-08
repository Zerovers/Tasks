import './index.css';
import React from 'react';

let spanStyle = {
  color: 'red',
}
let sign = { first: '>', second: '<', third: '=' };
export default class ComparisonTask extends React.Component {
  state = {
    inputValue: '',
    firstNumber: this.props.taskData.comparisonData.firstNumber,
    secondNumber: this.props.taskData.comparisonData.secondNumber,
    result: this.props.taskData.comparisonData.sign,
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
    if(this.state.inputValue + '' === this.state.result + '') {
      this.props.resultBattle('playerAttack', 'fireball')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack')
      this.props.selectAction('')
    }
    e.preventDefault();
  }

  onInputSubmit = (e) => {
    if(this.state.inputValue + '' === this.state.result + '') {
      this.props.resultBattle('playerAttack', 'fireball')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack')
      this.props.selectAction('')
    }
    e.preventDefault();
  }

  render() {
    return (
        <div className='comparison-content'>
          <p className='comparison-content__operations'>{this.state.firstNumber + ' '}<span style={spanStyle}>?</span> {this.state.secondNumber}</p>
          <p className='comparison-content__text'>Какой знак <span> {sign.first} </span> <span> {sign.third} </span> <span> {sign.second} </span> здесь нужен?</p>
            <form className='comparison-form' onSubmit={this.onInputSubmit}>
              <input 
              type='text'
              id='comparison-form__input'
              placeholder='Введите ответ'
              autoFocus
              autoComplete='off'
              required minLength='1'
              value={this.state.inputValue}
              onChange={this.onInputChange}
              onKeyPress={this.onKeyPress}
               />
              <button id='comparison-form__button'>Ответить</button>
            </form>
        </div>
      )}
  }
