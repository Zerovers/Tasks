import './index.css';
import React from 'react';
import grammaticList from './grammaticList';

const _ = require('lodash');

export default class GrammaticTask extends React.Component {
  state = {
    taskData: this.props.taskData,
    taskAnswer: '',
  }

  getAsnwerWord = (word) => {
    this.setState({ taskAnswer: word });
  }

  answerTask = (e) => {
    const recognizer = new webkitSpeechRecognition(); // eslint-disable-line new-cap, no-undef
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;
    recognizer.lang = 'en-US';
    recognizer.start();
    recognizer.onresult = async (event) => {
      const result = event.results[0][0].transcript;
      this.getAsnwerWord(result);
      console.log(this.state.taskAnswer);
      if (this.state.taskData === this.state.taskAnswer) {
        this.props.resultBattle('playerHeal', '')
        this.props.selectAction('')
      } else {
        this.props.resultBattle('enemyAttack', '')
        this.props.selectAction('')
      }
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className='grammatic-content'>
        <p className='grammatic-content__text'>Произнесите <span>{this.state.taskData}</span></p>
        <button id='grammatic__button' onClick={this.answerTask}>Сказать</button>
      </div>
    )
  }
}
