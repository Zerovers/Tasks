import './index.css';
import React from 'react';
import pause from '../../utility/pause';
import enemySoundAttack from './sounds/enemy_attack.wav';
import enemySoundTakeDamage from './sounds/enemy_take_damage.wav';

import enemyOneHead from './image/monster_1/monster_1_head.png';
import enemyOneBody from './image/monster_1/monster_1_body.png';
import enemyOneRightHand from './image/monster_1/monster_1_rightHand.png';
import enemyOneLeftHand from './image/monster_1/monster_1_leftHand.png';
import enemyOneRightLeg from './image/monster_1/monster_1_rightLeg.png';
import enemyOneLeftLeg from './image/monster_1/monster_1_leftLeg.png';

import enemyTwoHead from './image/monster_2/monster_2_head.png';
import enemyTwoBody from './image/monster_2/monster_2_body.png';
import enemyTwoRightHand from './image/monster_2/monster_2_rightHand.png';
import enemyTwoLeftHand from './image/monster_2/monster_2_leftHand.png';
import enemyTwoRightLeg from './image/monster_2/monster_2_rightLeg.png';
import enemyTwoLeftLeg from './image/monster_2/monster_2_leftLeg.png';
import enemyTwoWeapon from './image/monster_2/monster_2_weapon.png';

import enemyThreeHead from './image/monster_3/monster_3_head.png';
import enemyThreeBody from './image/monster_3/monster_3_body.png';
import enemyThreeRightHand from './image/monster_3/monster_3_rightHand.png';
import enemyThreeLeftHand from './image/monster_3/monster_3_leftHand.png';
import enemyThreeRightLeg from './image/monster_3/monster_3_rightLeg.png';
import enemyThreeLeftLeg from './image/monster_3/monster_3_leftLeg.png';

const _ = require('lodash');

let ENEMY_ANIMATED_HEAD = '';
let ENEMY_ACTIVE_HEAD = ' activeHead';
let ENEMY_ANIMATED_BODY = '';
let ENEMY_ANIMATED_RIGHT_HAND = '';
let ENEMY_ANIMATED_LEFT_HAND = '' ;
let ENEMY_ANIMATED_RIGHT_LEG = '' ;
let ENEMY_ANIMATED_LEFT_LEG = '';
let ENEMY_ORC_ANIMATED_WEAPON = 'enemy-weapon orc';
export default class Enemy extends React.Component {

  attackAnimation = async () => {
    switch (this.props.enemyMonsterBody) {
      case 1:
      ENEMY_ANIMATED_RIGHT_HAND = ' enemy-attack_rightHand';
      ENEMY_ANIMATED_LEFT_HAND = ' enemy-attack_leftHand';
      break;
      case 2:
      ENEMY_ANIMATED_RIGHT_HAND = ' enemy-attack-rightHand-orc';
      ENEMY_ANIMATED_LEFT_HAND = ' enemy-attack-leftHand-orc';
      ENEMY_ORC_ANIMATED_WEAPON = ' enemy-attack-weapon-orc'
      break;
      case 3: 
      ENEMY_ANIMATED_RIGHT_HAND = ' enemy-attack_rightHand-troll';
      ENEMY_ANIMATED_LEFT_HAND = ' enemy-attack_leftHand-troll';
      break;
      default:
    }
    this.addSound('attack');
    await pause(1000)
    this.props.resetResultBattle('');
    this.props.playerTakeDamage('playerTakeDamage', 0)
  }

  takeDamageAnimation = async () => {
    switch (this.props.enemyMonsterBody) {
      case 1:
        ENEMY_ANIMATED_HEAD = ' take-damage_head';
        ENEMY_ACTIVE_HEAD = '';
        ENEMY_ANIMATED_BODY = ' take-damage_body';
        ENEMY_ANIMATED_RIGHT_HAND = ' take-damage_rightHand';
        ENEMY_ANIMATED_LEFT_HAND = ' take-damage_leftHand';
        ENEMY_ANIMATED_RIGHT_LEG = ' take-damage_rightLeg';
        ENEMY_ANIMATED_LEFT_LEG = ' take-damage_leftLeg';
      break;
      case 2:
        ENEMY_ANIMATED_HEAD = ' take-damage_head';
        ENEMY_ACTIVE_HEAD = '';
        ENEMY_ANIMATED_BODY = ' take-damage_body';
        ENEMY_ANIMATED_RIGHT_HAND = ' take-damage_rightHand-orc';
        ENEMY_ANIMATED_LEFT_HAND = ' take-damage_leftHand';
        ENEMY_ANIMATED_RIGHT_LEG = ' take-damage_rightLeg';
        ENEMY_ANIMATED_LEFT_LEG = ' take-damage_leftLeg';
        ENEMY_ORC_ANIMATED_WEAPON = ' take-damage-weapon-orc'
      break;
      case 3:
        ENEMY_ANIMATED_HEAD = ' take-damage_head-troll';
        ENEMY_ACTIVE_HEAD = '';
        ENEMY_ANIMATED_BODY = ' take-damage_body';
        ENEMY_ANIMATED_RIGHT_HAND = ' take-damage-rightHand-troll';
        ENEMY_ANIMATED_LEFT_HAND = ' take-damage-leftHand-troll';
        ENEMY_ANIMATED_RIGHT_LEG = ' take-damage_rightLeg';
        ENEMY_ANIMATED_LEFT_LEG = ' take-damage_leftLeg';
      break;
      default:
    }
    this.addSound('takeDamage');
    await pause(500);
    this.props.enemyTakeDamage('', 0);
    this.props.resetResultBattle('')
  }

  resetAnimation = () => {
    switch (this.props.enemyMonsterBody) {
      case 1:
        ENEMY_ANIMATED_HEAD = '';
        ENEMY_ACTIVE_HEAD = ' activeHead';
        ENEMY_ANIMATED_BODY = '';
        ENEMY_ANIMATED_RIGHT_HAND = '';
        ENEMY_ANIMATED_LEFT_HAND = '' ;
        ENEMY_ANIMATED_RIGHT_LEG = '' ;
        ENEMY_ANIMATED_LEFT_LEG = '';
      break; 
      case 2:
        ENEMY_ANIMATED_HEAD = '';
        ENEMY_ACTIVE_HEAD = ' activeHead';
        ENEMY_ANIMATED_BODY = '';
        ENEMY_ANIMATED_RIGHT_HAND = '';
        ENEMY_ANIMATED_LEFT_HAND = '' ;
        ENEMY_ANIMATED_RIGHT_LEG = '' ;
        ENEMY_ANIMATED_LEFT_LEG = '';
        ENEMY_ORC_ANIMATED_WEAPON = '';
      break;
      case 3:
        ENEMY_ANIMATED_HEAD = '';
        ENEMY_ACTIVE_HEAD = ' activeHead';
        ENEMY_ANIMATED_BODY = '';
        ENEMY_ANIMATED_RIGHT_HAND = '';
        ENEMY_ANIMATED_LEFT_HAND = '' ;
        ENEMY_ANIMATED_RIGHT_LEG = '' ;
        ENEMY_ANIMATED_LEFT_LEG = '';
     break; 
      default:
    }
  }

  addSound = (name) => {
    const attack = new Audio(`${enemySoundAttack}`);
    const takeDamage = new Audio(`${enemySoundTakeDamage}`);
    switch (name) {
      case 'attack':
        attack.volume = 0.3;
        attack.play();
        break;
      case 'takeDamage':
        takeDamage.volume = 0.5;
        takeDamage.play();
        break;
      default:
    }
  }

  chooseMonster = () => {
    switch (this.props.enemyMonsterBody) {
      case 1:
        return (
          <div className='conteiner'>
            <img src={enemyOneHead} alt="enemyBody" className={'enemy-head' + (ENEMY_ACTIVE_HEAD) + (ENEMY_ANIMATED_HEAD)} />
            <img src={enemyOneBody} alt="enemyBody" className={'enemy-body' + (ENEMY_ANIMATED_BODY)} />
            <img src={enemyOneRightHand} alt="enemyBody" className={'enemy-rightHand' + (ENEMY_ANIMATED_RIGHT_HAND)} />
            <img src={enemyOneLeftHand} alt="enemyBody" className={'enemy-leftHand' + (ENEMY_ANIMATED_LEFT_HAND)} />
            <img src={enemyOneRightLeg} alt="enemyBody" className={'enemy-rightLeg' + (ENEMY_ANIMATED_RIGHT_LEG)} />
            <img src={enemyOneLeftLeg} alt="enemyBody" className={'enemy-leftLeg' + (ENEMY_ANIMATED_LEFT_LEG)} />
          </div>
        )
      case 2:
        return (
          <div className='conteiner'>
            <img src={enemyTwoHead} alt="enemyBody" className={'enemy-head' + (ENEMY_ACTIVE_HEAD)  + (ENEMY_ANIMATED_HEAD)} />
            <img src={enemyTwoBody} alt="enemyBody" className={'enemy-body' + (ENEMY_ANIMATED_BODY)} />
            <img src={enemyTwoRightHand} alt="enemyBody" className={'enemy-rightHand orc' + (ENEMY_ANIMATED_RIGHT_HAND)} />
            <img src={enemyTwoLeftHand} alt="enemyBody"  className={'enemy-leftHand orc' + (ENEMY_ANIMATED_LEFT_HAND)} />
            <img src={enemyTwoRightLeg} alt="enemyBody" className={'enemy-rightLeg orc' + (ENEMY_ANIMATED_RIGHT_LEG)} />
            <img src={enemyTwoLeftLeg} alt="enemyBody" className={'enemy-leftLeg orc' + (ENEMY_ANIMATED_LEFT_LEG)} />
            <img src={enemyTwoWeapon} alt="enemyBody" className={'enemy-weapon orc' + (ENEMY_ORC_ANIMATED_WEAPON)} />
          </div>
        )
      case 3:
      return (
        <div className='conteiner'>
            <img src={enemyThreeHead} alt="enemyBody" className={'enemy-head troll' + (ENEMY_ACTIVE_HEAD) + (ENEMY_ANIMATED_HEAD)} />
            <img src={enemyThreeBody} alt="enemyBody" className={'enemy-body' + (ENEMY_ANIMATED_BODY)} />
            <img src={enemyThreeRightHand} alt="enemyBody" className={'enemy-rightHand troll' + (ENEMY_ANIMATED_RIGHT_HAND)} />
            <img src={enemyThreeLeftHand} alt="enemyBody" className={'enemy-leftHand troll' + (ENEMY_ANIMATED_LEFT_HAND)} />
            <img src={enemyThreeRightLeg} alt="enemyBody" className={'enemy-rightLeg' + (ENEMY_ANIMATED_RIGHT_LEG)} />
            <img src={enemyThreeLeftLeg} alt="enemyBody" className={'enemy-leftLeg' + (ENEMY_ANIMATED_LEFT_LEG)} />
        </div>
        )
      default:
    }
  }
  render() {
    if (this.props.enemyTakeDamageState === 'take') {
      this.takeDamageAnimation();
    } else if (this.props.resultBattle === 'enemyAttack') {
      this.attackAnimation();
    } else if (this.props.resultBattle === '') {
      this.resetAnimation();
    }
    return (
      <>
        <div className='enemy-Model'>{this.chooseMonster(1)}</div>
      </>
    )}
}