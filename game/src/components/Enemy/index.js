import './index.css';
import BattleArena from '../../screens/battle';
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

import enemySoundAttack from './sounds/enemy_attack.wav';
import enemySoundTakeDamage from './sounds/enemy_take_damage.wav';
import pause from '../../utility/pause';
import names from './name.json';

const _ = require('lodash');

const newMonster = _.random(1, 3);
const PLACE_ENEMY_IN_BATTLE_ARENA = '.enemy-Model .conteiner';
export default class Enemy {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
    this.newMonster = newMonster;
    $('.enemy-name').html(this.name);
  }

  getDamage() {
    this.hp -= 20;
    $('.enemy-hp span').css('width', `${this.hp * 5}px`);
    $('.enemy-hp').css('animation', 'shake 1s linear');
    $('.spell').css('visibility', 'hidden');
    $('.spell').css('left', 305);
    this.addAnimationTakeDamage();
  }

  indicationHp() {
    $('.enemy-name').html(this.name);
    $('.enemy-hp span').css('width', `${this.hp * 5}px`);
  }

  resetParametrs() {
    this.name = `${names.firstName[_.random(0, names.firstName.length - 1)]} 
    ${names.secondName[_.random(0, names.secondName.length - 1)]} 
    ${names.thirdName[_.random(0, names.thirdName.length - 1)]}`;
    this.hp = 100;
    this.newMonster = _.random(1, 3);
    this.indicationHp();
    this.renderBody();
  }

  renderBody() {
    $(PLACE_ENEMY_IN_BATTLE_ARENA).html('');
    switch (this.newMonster) {
      case 1:
        $(PLACE_ENEMY_IN_BATTLE_ARENA)
          .append(`<img src="${enemyOneHead}" alt="enemyBody" class="enemy-head activeHead">`)
          .append(`<img src="${enemyOneBody}" alt="enemyBody" class="enemy-body" id="enemy-body">`)
          .append(`<img src="${enemyOneRightHand}" alt="enemyBody" class="enemy-rightHand">`)
          .append(`<img src="${enemyOneLeftHand}" alt="enemyBody" class="enemy-leftHand">`)
          .append(`<img src="${enemyOneRightLeg}" alt="enemyBody" class="enemy-rightLeg">`)
          .append(`<img src="${enemyOneLeftLeg}" alt="enemyBody" class="enemy-leftLeg">`);
        break;
      case 2:
        $(PLACE_ENEMY_IN_BATTLE_ARENA)
          .append(`<img src="${enemyTwoHead}" alt="enemyBody" class="enemy-head activeHead">`)
          .append(`<img src="${enemyTwoBody}" alt="enemyBody" class="enemy-body" id="enemy-body">`)
          .append(`<img src="${enemyTwoRightHand}" alt="enemyBody" class="enemy-rightHand orc">`)
          .append(`<img src="${enemyTwoLeftHand}" alt="enemyBody" class="enemy-leftHand orc">`)
          .append(`<img src="${enemyTwoRightLeg}" alt="enemyBody" class="enemy-rightLeg orc">`)
          .append(`<img src="${enemyTwoLeftLeg}" alt="enemyBody" class="enemy-leftLeg orc">`)
          .append(`<img src="${enemyTwoWeapon}" alt="enemyBody" class="enemy-weapon orc">`);
        break;
      case 3:
        $(PLACE_ENEMY_IN_BATTLE_ARENA)
          .append(`<img src="${enemyThreeHead}" alt="enemyBody" class="enemy-head troll activeHead">`)
          .append(`<img src="${enemyThreeBody}" alt="enemyBody" class="enemy-body" id="enemy-body">`)
          .append(`<img src="${enemyThreeRightHand}" alt="enemyBody" class="enemy-rightHand troll">`)
          .append(`<img src="${enemyThreeLeftHand}" alt="enemyBody" class="enemy-leftHand troll">`)
          .append(`<img src="${enemyThreeRightLeg}" alt="enemyBody" class="enemy-rightLeg">`)
          .append(`<img src="${enemyThreeLeftLeg}" alt="enemyBody" class="enemy-leftLeg">`);
        break;
      default:
    }
    BattleArena.checkLoader();
  }

  addAnimationAttack() {
    switch (this.newMonster) {
      case 1:
        $('.enemy-rightHand').addClass('enemy-attack_rightHand');
        $('.enemy-leftHand').addClass('enemy-attack_leftHand');
        break;
      case 2:
        $('.enemy-rightHand').addClass('enemy-attack-rightHand-orc');
        $('.enemy-leftHand').addClass('enemy-attack-leftHand-orc');
        $('.enemy-weapon').addClass('enemy-attack-weapon-orc');
        break;
      case 3:
        $('.enemy-rightHand').addClass('enemy-attack_rightHand-troll');
        $('.enemy-leftHand').addClass('enemy-attack_leftHand-troll');
        break;
      default:
    }
    Enemy.addSound('attack');
  }

  async addAnimationTakeDamage() {
    $('.enemy-head').removeClass('activeHead');
    $('.enemy-body').addClass('take-damage_body');
    $('.enemy-rightLeg').addClass('take-damage_rightLeg');
    $('.enemy-leftLeg').addClass('take-damage_leftLeg');
    switch (this.newMonster) {
      case 1:
        $('.enemy-head').addClass('take-damage_head');
        $('.enemy-rightHand').addClass('take-damage_rightHand');
        $('.enemy-leftHand').addClass('take-damage_leftHand');
        break;
      case 2:
        $('.enemy-head').addClass('take-damage_head');
        $('.enemy-rightHand').addClass('take-damage_rightHand-orc');
        $('.enemy-leftHand').addClass('take-damage_leftHand');
        $('.enemy-weapon').addClass('take-damage-weapon-orc');
        break;
      case 3:
        $('.enemy-head').addClass('take-damage_head-troll');
        $('.enemy-rightHand').addClass('take-damage-rightHand-troll');
        $('.enemy-leftHand').addClass('take-damage-leftHand-troll');
        break;
      default:
    }
    Enemy.addSound('takeDamage');
    await pause(500);
    $('.enemy-head').addClass('activeHead');
  }

  static removeAnimationTakeDamage() {
    $('.enemy-body').removeClass('take-damage_body');
    $('.enemy-rightLeg').removeClass('take-damage_rightLeg');
    $('.enemy-leftLeg').removeClass('take-damage_leftLeg');
    $('.enemy-rightHand').removeClass('take-damage_rightHand');
    $('.enemy-leftHand').removeClass('take-damage_leftHand');
    $('.enemy-rightHand').removeClass('take-damage_rightHand-orc');
    $('.enemy-leftHand').removeClass('take-damage_leftHand');
    $('.enemy-weapon').removeClass('take-damage-weapon-orc');
    $('.enemy-rightHand').removeClass('take-damage-rightHand-troll');
    $('.enemy-leftHand').removeClass('take-damage-leftHand-troll');
  }

  static removeAnimationAttack() {
    $('.enemy-rightHand').removeClass('enemy-attack_rightHand');
    $('.enemy-leftHand').removeClass('enemy-attack_leftHand');
    $('.enemy-rightHand').removeClass('enemy-attack-rightHand-orc');
    $('.enemy-leftHand').removeClass('enemy-attack-leftHand-orc');
    $('.enemy-weapon').removeClass('enemy-attack-weapon-orc');
    $('.enemy-rightHand').removeClass('enemy-attack_rightHand-troll');
    $('.enemy-leftHand').removeClass('enemy-attack_leftHand-troll');
  }

  static removeAnimations() {
    Enemy.removeAnimationAttack();
    Enemy.removeAnimationTakeDamage();
  }

  static addSound(name) {
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
}
