import './index.css';
import React from 'react';

export default class SequenceTask extends React.Component {
  state = {
    inputValue: '',
    rndNumber: this.props.taskData.rndNumber,
    rndDiff: this.props.taskData.rndDiff,
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
    if(this.state.inputValue + '' === this.state.rndNumber + this.state.rndDiff * 3 + '') {
      this.props.resultBattle('playerAttack', 'arcanemissile')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack', '')
      this.props.selectAction('')
    }
    e.preventDefault();
  }

  onInputSubmit = (e) => {
    if(this.state.inputValue + '' === this.state.rndNumber + this.state.rndDiff * 3 + '') {
      this.props.resultBattle('playerAttack', 'arcanemissile')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack', '')
      this.props.selectAction('')
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className='sequence-content'>
        <p className='sequence-content__number'>Продолжите последовательность цифр <br></br>
          <span>{this.state.rndNumber + ' '}</span>
          <span>{this.state.rndNumber + this.state.rndDiff + ' '}</span>
          <span>{this.state.rndNumber + this.state.rndDiff * 2 + ' '}</span>
          <span>?</span>
        </p>
        <form id='sequence-form' onSubmit={this.onInputSubmit}>
          <input
            type='number'
            id='sequence-form__input'
            autoFocus
            autoComplete='off'
            required minLength='1'
            value={this.state.inputValue}
            onChange={this.onInputChange}
            onKeyPress={this.onKeyPress}
             />
          <button id='sequence-form__button'>Ответить</button>
        </form>
      </div>
    )
  }
}
