import './index.css';
import React from 'react';

export default class MathTask extends React.Component {
  state = {
    inputValue: '',
    firstNumber: this.props.taskData.mathData.firstNumber,
    secondNumber: this.props.taskData.mathData.secondNumber,
    outSign: this.props.taskData.mathData.outsign,
    result: this.props.taskData.mathResult,
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
      this.props.resultBattle('playerAttack', 'frostbolt')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack', '')
      this.props.selectAction('')
    }
    e.preventDefault();
  }

  onInputSubmit = (e) => {
    if(this.state.inputValue + '' === this.state.result + '') {
      this.props.resultBattle('playerAttack', 'frostbolt')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack', '')
      this.props.selectAction('')
    }
    e.preventDefault();
  }
  
  render() {
    return (
      <>
      <div className='math-content'>
      <p className='math-content__operations'>{this.state.firstNumber + ' ' + this.state.outSign + ' ' + this.state.secondNumber} = <span>?</span></p>
        <form className='math-form' onSubmit={this.onInputSubmit}>
          <input 
          type='number'
          id='math-form__input'
          autoFocus
          autoComplete='off'
          required minLength='1'
          value={this.state.inputValue}
          onChange={this.onInputChange}
          onKeyPress={this.onKeyPress}
          />
          <button id='math-form__button'>Ответить</button>
        </form>
      </div>
      </>
    )}
}