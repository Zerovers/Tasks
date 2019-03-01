import './index.css';
import React from 'react';
import { withRouter } from 'react-router-dom';
import SpellFactory from '../../components/modal-dialog';
import Player from '../../components/Player';
import Enemy from '../../components/Enemy';
import AttackSpellList from '../../components/modal-dialog/AttackSpellList';
import HealSpellList from '../../components/modal-dialog/HealSpellList';
import selectTasks from '../../utility/selectTasks';
import TableScore from '../score/index';
import pause from '../../utility/pause';

import './image/background_battleZone.jpg';

import enemyNames from '../../components/Enemy/name.json';

const _ = require('lodash');

class BattleArena extends React.Component {
  state = {
    playerName: this.props.playerName,
    enemyName: `${enemyNames.firstName[_.random(0, enemyNames.firstName.length - 1)]} 
    ${enemyNames.secondName[_.random(0, enemyNames.secondName.length - 1)]} 
    ${enemyNames.thirdName[_.random(0, enemyNames.thirdName.length - 1)]}`,
    enemyMonsterBody: _.random(1, 3),
    playerHp: 100,
    enemyHp: 100,
    stateBattle: '',
    shadowFrame: 'hidden',
    taskName: '',
    resultBattle: '',
    playerAttack: '',
    playerTakeDamage: '',
    enemyAttack: '',
    enemyTakeDamage: '',
    countMonsters: 0,
    spellName: '',
    playerDie: false,
  };

  ChoiceSpells = () => {
    this.setState({ stateBattle: 'chooseAction', shadowFrame: 'visibility' });
  }

  selectAction = (arg) => {
    this.setState({ stateBattle: arg });
    if (arg === '') {
      this.setState({ shadowFrame: 'hidden ' });
    }
  }

  selectTask = (name) => {
    this.setState({ taskName: name });
  }

  resultBattle = (result, spellName) => {
    this.setState({ resultBattle: result, spellName });
  }

  enemyTakeDamage = async (result, hp) => {
    this.setState({ enemyTakeDamage: result, enemyHp: this.state.enemyHp - hp });
    if (this.state.enemyHp === 0) {
      this.setState({ enemyHp: 100 });
      await pause(500);
      this.renderNewMonster();
    }
  }

  renderNewMonster = () => {
    this.setState({
      enemyName: `${enemyNames.firstName[_.random(0, enemyNames.firstName.length - 1)]} 
      ${enemyNames.secondName[_.random(0, enemyNames.secondName.length - 1)]} 
      ${enemyNames.thirdName[_.random(0, enemyNames.thirdName.length - 1)]}`,
      countMonsters: this.state.countMonsters += 1,
      enemyMonsterBody: _.random(1, 3),
    });
  }

  playerTakeDamage = (result, hp) => {
    this.setState({ playerTakeDamage: result, playerHp: this.state.playerHp - hp });
    if (this.state.playerHp === 0) {
      this.setState({ stateBattle: 'gameOver' });
    }
  }

  playerHealing = () => {
    this.setState({ playerHp: this.state.playerHp + 20 });
    if (this.state.playerHp >= 100) {
      this.setState({ playerHp: 100 });
    }
    $('.heal').css('visibility', 'hidden');
  }

  resetGame = () => {
    this.setState({
      playerHp: 100,
      enemyHp: 100,
      enemyName: `${enemyNames.firstName[_.random(0, enemyNames.firstName.length - 1)]} 
      ${enemyNames.secondName[_.random(0, enemyNames.secondName.length - 1)]} 
      ${enemyNames.thirdName[_.random(0, enemyNames.thirdName.length - 1)]}`,
      countMonsters: 0,
      stateBattle: '',
    });
  }

  render() {
    const selectAction = this.selectAction;
    const resultBattle = this.resultBattle;
    const stateBattle = this.state.stateBattle;
    let modal = null;
    if (stateBattle === 'chooseAction') {
      modal = <SpellFactory selectAction={this.selectAction} />;
    } else if (stateBattle === 'healSpellList') {
      modal = <HealSpellList selectAction={this.selectAction} selectTask={this.selectTask} />;
    } else if (stateBattle === 'attackSpellList') {
      modal = <AttackSpellList selectAction={this.selectAction} selectTask={this.selectTask} />;
    } else if (stateBattle === 'selectTask') {
      modal = selectTasks(this.state.taskName, { selectAction, resultBattle });
    } else if (stateBattle === 'gameOver') {
      modal = (
        <TableScore
          playerName={this.state.playerName}
          countMonsters={this.state.countMonsters}
          stateBattle={this.state.stateBattle}
          resetResultBattle={this.resultBattle}
          resetGame={this.resetGame}
        />
      );
    }
    console.log(this.state.resultBattle);
    return (
      <div className="battleArena-background">
        <div className={`shadow-frame ${this.state.shadowFrame}`} />
        <div className="hpBars">
          <div className="player">
            <p className="player-name">{this.state.playerName}</p>
            <div className="player-hp">
              <span style={{ width: `${this.state.playerHp * 5}px` }} />
            </div>
          </div>
          <div className="enemy">
            <p className="enemy-name">{this.state.enemyName}</p>
            <div className="enemy-hp">
              <span style={{ width: `${this.state.enemyHp * 5}px` }} />
            </div>
          </div>
        </div>
        <div className="placeModel">
          <Player
            resultBattle={this.state.resultBattle}
            enemyTakeDamage={this.enemyTakeDamage}
            resetResultBattle={this.resultBattle}
            playerTakeDamage={this.playerTakeDamage}
            playerTakeDamageState={this.state.playerTakeDamage}
            spellName={this.state.spellName}
            playerHealing={this.playerHealing}
          />
          <Enemy
            resultBattle={this.state.resultBattle}
            enemyTakeDamage={this.enemyTakeDamage}
            enemyTakeDamageState={this.state.enemyTakeDamage}
            resetResultBattle={this.resultBattle}
            playerTakeDamage={this.playerTakeDamage}
            enemyHp={this.state.enemyHp}
            enemyMonsterBody={this.state.enemyMonsterBody}
          />
        </div>
        <button className="button__start-fight" onClick={this.ChoiceSpells}> Начать бой </button>
        {modal}
      </div>
    );
  }
}
export default withRouter(BattleArena);