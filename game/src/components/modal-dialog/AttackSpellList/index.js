import './index.css';
import React from 'react';

export default class AttackSpellList extends React.Component {
  render() {
    let selectTask = this.props.selectTask;
    let selectAction = this.props.selectAction;
    return (
      <>
      <div className='attack__spells__list'>
        <button className='spell-math' onClick={ () => { selectTask('mathTask'); selectAction('selectTask'); }}>Математика</button>
        <button className='spell-comparison' onClick={ () => { selectTask('comparisonTask'); selectAction('selectTask'); }}>Сравнение</button>
        <button className='spell-sort' onClick={ () => { selectTask('sortTask'); selectAction('selectTask'); }}>Сортировка</button>
        <button className='spell-translate' onClick={ () => { selectTask('translateTask'); selectAction('selectTask'); }}>Перевод</button>
        <button className='spell-sequence' onClick={ () => { selectTask('sequenceTask'); selectAction('selectTask'); }}>Последовательность</button>
      </div>
      </>
    )
    }
}