import './index.css';
import React from 'react';

export default class HealSpellList extends React.Component {
  render() {
    let selectTask = this.props.selectTask;
    let selectAction = this.props.selectAction;
    return (
      <>
      <div className='heal__spells__list'>
        <button className='spell-pazzle' onClick={ () => { selectTask('pazzleTask'); selectAction('selectTask'); } }>Загадка</button>
        <button className='spell-speech'onClick={ () => { selectTask('speechTask'); selectAction('selectTask'); } }>Произношение</button>
        <button className='spell-grammatic' onClick={ () => { selectTask('grammaticTask'); selectAction('selectTask'); } }>Грамматика</button>
        <button className='spell-logic' onClick={ () => { selectTask('logicTask'); selectAction('selectTask'); } }>Логика</button>
        <button className='spell-delete-word' onClick={ () => { selectTask('deleteWordTask'); selectAction('selectTask'); } }>4 Лишний</button>
      </div>
      </>
    )
  }
}

