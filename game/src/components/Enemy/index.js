import css from './index.css';

let _ = require('lodash');
const monster = _.random(1, 3);
export default class Enemy {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
    $('.enemy-name').html(this.name);
  }
  sayHi() {
    console.log(`Я злой и страшный ${this.name} и у меня ${this.hp} жизней`);
  }
  async getDamage() {
    this.hp -= 50;
    $('.enemy-hp span').css('width', `${this.hp * 5}px`);
    $('.enemy-hp').css('animation', 'shake 1s linear');
    $('.spell').css('visibility', 'hidden');
    $('.spell').css('left', 305);
    $('.spell.heal').css('left', -15);
    this.addAnimationTakeDamage();
  }
  indicationHp() {
    $('.enemy-name').html(this.name);
    $('.enemy-hp span').css('width', `${this.hp * 5}px`);
  }
  renderBody() {
    $('.enemy-Model .conteiner').html('');
    switch (monster) {
      case 1:
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/head.png" alt="enemyBody" class="enemy-head activeHead"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/body.png" alt="enemyBody" class="enemy-body" id="enemy-body"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/rightHand.png" alt="enemyBody" class="enemy-rightHand"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/leftHand.png" alt="enemyBody" class="enemy-leftHand"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/rightLeg.png" alt="enemyBody" class="enemy-rightLeg"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/leftLeg.png" alt="enemyBody" class="enemy-leftLeg"></img>');
        break;
      case 2:
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/head.png" alt="enemyBody" class="enemy-head activeHead"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/body.png" alt="enemyBody" class="enemy-body" id="enemy-body"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/rightHand.png" alt="enemyBody" class="enemy-rightHand orc"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/leftHand.png" alt="enemyBody" class="enemy-leftHand orc"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/rightLeg.png" alt="enemyBody" class="enemy-rightLeg orc"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/leftLeg.png" alt="enemyBody" class="enemy-leftLeg orc"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/weapon.png" alt="enemyBody" class="enemy-weapon orc"></img>');
        break;
        case 3:
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/head.png" alt="enemyBody" class="enemy-head troll activeHead"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/body.png" alt="enemyBody" class="enemy-body" id="enemy-body"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/rightHand.png" alt="enemyBody" class="enemy-rightHand troll"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/leftHand.png" alt="enemyBody" class="enemy-leftHand troll"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/rightLeg.png" alt="enemyBody" class="enemy-rightLeg"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/leftLeg.png" alt="enemyBody" class="enemy-leftLeg"></img>');
    }
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
    // 
    $('.enemy-rightHand').removeClass('attack_rightHand');
    $('.enemy-leftHand').removeClass('attack_leftHand');
    $('.enemy-rightHand').removeClass('enemy-attack-rightHand-orc');
    $('.enemy-leftHand').removeClass('enemy-attack-leftHand-orc');
    $('.enemy-weapon').removeClass('enemy-attack-weapon-orc');
    $('.enemy-rightHand').removeClass('enemy-attack_rightHand-troll');
    $('.enemy-leftHand').removeClass('enemy-attack_leftHand-troll');
  }
  addAnimationAttack() {
    $('.placeModel').css('opacity', 1);
    switch(monster) {
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
  }
  async addAnimationTakeDamage() {
    $('.enemy-head').removeClass('activeHead');
    $('.enemy-body').addClass('take-damage_body');
    $('.enemy-rightLeg').addClass('take-damage_rightLeg');
    $('.enemy-leftLeg').addClass('take-damage_leftLeg');
    switch(monster) {
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
    await pause(500);
    $('.enemy-head').addClass('activeHead');
  }
}

const pause = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
