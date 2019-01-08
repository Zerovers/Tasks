import './index.css';
import React from 'react';

export default class SpellFactory extends React.Component {
  render() {
    let selectAction = this.props.selectAction; 
    return (
      <>
      <div className='context-menu'>
        <p className='context-menu__text'>Выберите действие</p>
        <div className='spell'>
          <button className='spell__heal' onClick={ () => { selectAction('healSpellList')}}><p>Восстановить здоровье</p></button>
          <button className='spell__attack' onClick={ () => {  selectAction('attackSpellList')}}><p>Атаковать</p></button>
        </div>
      </div>
      </>
    )}
    
}
