import css from './index.css';
import enemyOne_Head from './image/monster_1/monster_1_head.png';
import enemyOne_Body from './image/monster_1/monster_1_body.png';
import enemyOne_RightHand from './image/monster_1/monster_1_rightHand.png';
import enemyOne_LeftHand from './image/monster_1/monster_1_leftHand.png';
import enemyOne_RightLeg from './image/monster_1/monster_1_rightLeg.png';
import enemyOne_LeftLeg from './image/monster_1/monster_1_leftLeg.png';
// 
import enemyTwo_Head from './image/monster_2/monster_2_head.png';
import enemyTwo_Body from './image/monster_2/monster_2_body.png';
import enemyTwo_RightHand from './image/monster_2/monster_2_rightHand.png';
import enemyTwo_LeftHand from './image/monster_2/monster_2_leftHand.png';
import enemyTwo_RightLeg from './image/monster_2/monster_2_rightLeg.png';
import enemyTwo_LeftLeg from './image/monster_2/monster_2_leftLeg.png';
import enemyTwo_Weapon from './image/monster_2/monster_2_weapon.png';
//
import enemyThree_Head from './image/monster_3/monster_3_head.png';
import enemyThree_Body from './image/monster_3/monster_3_body.png';
import enemyThree_RightHand from './image/monster_3/monster_3_rightHand.png';
import enemyThree_LeftHand from './image/monster_3/monster_3_leftHand.png';
import enemyThree_RightLeg from './image/monster_3/monster_3_rightLeg.png';
import enemyThree_LeftLeg from './image/monster_3/monster_3_leftLeg.png';

import enemySoundAttack from './sounds/enemy_attack.wav';
import enemySoundTakeDamage from './sounds/enemy_take_damage.wav';
import pause from '../utils/index';

let _ = require('lodash');
let newMonster = _.random(1,3);
export default class Enemy {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
    this.newMonster = newMonster;
    $('.enemy-name').html(this.name);
  }
  async getDamage() {
    this.hp -= 50;
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
  renderBody() {
    $('.enemy-Model .conteiner').html('');
    switch(this.newMonster) {
      case 1:
        $('.enemy-Model .conteiner').append(`<img src="${enemyOne_Head}" alt="enemyBody" class="enemy-head activeHead">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyOne_Body}" alt="enemyBody" class="enemy-body" id="enemy-body">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyOne_RightHand}" alt="enemyBody" class="enemy-rightHand">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyOne_LeftHand}" alt="enemyBody" class="enemy-leftHand">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyOne_RightLeg}" alt="enemyBody" class="enemy-rightLeg">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyOne_LeftLeg}" alt="enemyBody" class="enemy-leftLeg">`);
        break;
      case 2:
        $('.enemy-Model .conteiner').append(`<img src="${enemyTwo_Head}" alt="enemyBody" class="enemy-head activeHead">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyTwo_Body}" alt="enemyBody" class="enemy-body" id="enemy-body">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyTwo_RightHand}" alt="enemyBody" class="enemy-rightHand orc">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyTwo_LeftHand}" alt="enemyBody" class="enemy-leftHand orc">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyTwo_RightLeg}" alt="enemyBody" class="enemy-rightLeg orc">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyTwo_LeftLeg}" alt="enemyBody" class="enemy-leftLeg orc">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyTwo_Weapon}" alt="enemyBody" class="enemy-weapon orc">`);
        break;
      case 3:
        $('.enemy-Model .conteiner').append(`<img src="${enemyThree_Head}" alt="enemyBody" class="enemy-head troll activeHead">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyThree_Body}" alt="enemyBody" class="enemy-body" id="enemy-body">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyThree_RightHand}" alt="enemyBody" class="enemy-rightHand troll">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyThree_LeftHand}" alt="enemyBody" class="enemy-leftHand troll">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyThree_RightLeg}" alt="enemyBody" class="enemy-rightLeg">`);
        $('.enemy-Model .conteiner').append(`<img src="${enemyThree_LeftLeg}" alt="enemyBody" class="enemy-leftLeg">`);
    }
  }
  addAnimationAttack() {
    $('.placeModel').css('opacity', 1);
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
    }
    this.addSound('attack');
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
        break
      case 3:
        $('.enemy-head').addClass('take-damage_head-troll');
        $('.enemy-rightHand').addClass('take-damage-rightHand-troll');
        $('.enemy-leftHand').addClass('take-damage-leftHand-troll');
        break;
    }
    this.addSound('takeDamage');
    await pause(500);
    $('.enemy-head').addClass('activeHead');
  }
  removeAnimationTakeDamage() {
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
  removeAnimationAttack() {
    $('.enemy-rightHand').removeClass('enemy-attack_rightHand');
    $('.enemy-leftHand').removeClass('enemy-attack_leftHand');
    $('.enemy-rightHand').removeClass('enemy-attack-rightHand-orc');
    $('.enemy-leftHand').removeClass('enemy-attack-leftHand-orc');
    $('.enemy-weapon').removeClass('enemy-attack-weapon-orc');
    $('.enemy-rightHand').removeClass('enemy-attack_rightHand-troll');
    $('.enemy-leftHand').removeClass('enemy-attack_leftHand-troll');
  }
  removeAnimations() {
    this.removeAnimationAttack();
    this.removeAnimationTakeDamage();
  }
  addSound(name) {
    switch(name) {
      case 'attack':
      const attack = new Audio(`${enemySoundAttack}`);
      attack.volume = 0.3;
      attack.play();
      break;
      case 'takeDamage':
      const takeDamage = new Audio(`${enemySoundTakeDamage}`);
      takeDamage.volume = 0.5;
      takeDamage.play();
      break;
    }
  }
}
