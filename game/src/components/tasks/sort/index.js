import './index.css';
import './jquery-ui/jquery-ui.min';
import React from 'react';

export default class SortTask extends React.Component {
  state = {
    taskValue: this.props.taskData.sortData.rndKeys,
    result: this.props.taskData.sortData.answer
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
    console.log(this.state.taskValue);
    console.log(this.state.result);
    const listItems = this.state.taskValue.split('').map((item, index) => <li id='ui-state-default' key={index}>{item}</li>);
    return (
      <div className='sort-content'>
        <p className='sort-content__text'>Составте правильное слово</p>
        <div className='sortable'>
          <ul id='sortable__items'>{listItems}</ul>
        </div>
        <button id='sort__button'>Проверить</button>
      </div>
    )
  }
}