import './index.css';
import React from 'react';

export default class LogicTask extends React.Component {
  state = { 
    inputValue: '',
    taskData: this.props.taskData.rndKeys,
    taskAnswer: this.props.taskData.answer
  }

  onInputChange = (e) => {
    this.setState({ 
      inputValue: e.target.value.toLowerCase(),
     });
  }

  onKeyPress = (e) => {
    if(e.key !== 'Enter') {
      return;
    }
    let count = 0;
    for (let i = 0; i < this.state.taskAnswer.length; i += 1) {
      if (this.state.inputValue === this.state.taskAnswer[i]) {
        count += 1;
      }
    }
    if(count > 0) {
      this.props.resultBattle('playerHeal', '')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack', '')
      this.props.selectAction('')
    }
    e.preventDefault();
  }

  onInputSubmit = (e) => {
    let count = 0;
    for (let i = 0; i < this.state.taskAnswer.length; i += 1) {
      if (this.state.inputValue === this.state.taskAnswer[i]) {
        count += 1;
      }
    }
    if(count > 0) {
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
      <div className='logic-content'>
        <p className='logic-content__text'>Ответьте на вопрос: <br></br> {this.state.taskData}</p>
        <form className='logic-form' onSubmit={this.onInputSubmit}>
          <input 
            type='text'
            id='logic-form__input' 
            autoFocus
            autoComplete='off'
            required minLength='1'
            value={this.state.inputValue}
            onChange={this.onInputChange}
            onKeyPress={this.onKeyPress}
            />
          <button id='logic-form__button'>Ответить</button>
        </form>
      </div>
    )
  }
}
