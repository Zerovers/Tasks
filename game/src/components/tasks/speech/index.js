import './index.css';
import React from 'react';
import pause from '../../../utility/pause'

let voices = speechSynthesis.getVoices();
export default class SpeechTask extends React.Component {
  state = {
    inputValue: '',
    taskData: this.props.taskData,
    firstLoad: '',
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
    if(this.state.inputValue + '' === this.state.taskData + '') {
      this.props.resultBattle('playerHeal', '')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack', '')
      this.props.selectAction('')
    }
    e.preventDefault();
  }

  onInputSubmit = (e) => {
    if(this.state.inputValue + '' === this.state.taskData + '') {
      this.props.resultBattle('playerHeal', '')
      this.props.selectAction('')
    } else {
      this.props.resultBattle('enemyAttack', '')
      this.props.selectAction('')
    }
    e.preventDefault();
  }

  setSpeech = async () => {
    const message = this.state.taskData;
    const msg = new SpeechSynthesisUtterance(message);
    msg.pitch = 1;
    msg.rate = 0.8;
    voices = speechSynthesis.getVoices();
    const [usingVoice] = [voices[3]];
    msg.voice = usingVoice;
    speechSynthesis.speak(msg);
    await pause(100);
    this.firstLoad();
  }

  firstLoad = () => {
    this.setState({ firstLoad: true })
  }

  render() {
    if (!this.state.firstLoad) {
      this.setSpeech()
    }
    return (
      <div className='speech-content'>
        <p className='speech-content__text'>Впишите слово которое услышали</p>
        <button id='speech__button' onClick={this.setSpeech}><i className="fas fa-volume-up"></i></button>
        <form className='speech-form' onSubmit={this.onInputSubmit}>
          <input
            type='text'
            id='speech__input'
            autoFocus
            autoComplete='off'
            required minLength='1'
            value={this.state.inputValue}
            onChange={this.onInputChange}
            onKeyPress={this.onKeyPress}
          />
          <button id='speech-form__button'>Ответить</button>
        </form>
      </div>
    )
  }
}
