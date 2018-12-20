import css from './index.css';

export default class Player {
  constructor(name, hp, countMonsters) {
    this.name = name;
    this.hp = hp;
    this.countMonsters = countMonsters;
    $('.player > p.player-name').html(name);
  }
  sayHi() {
    console.log(`Меня зовут ${this.name} я имею ${this.hp} жизней`);
  }
  killMonsters() {
    this.countMonsters += 1;
    console.log(this.countMonsters);
  }
  getDamage() {
    this.hp -= 20;
    $('.player-hp > span').css('width', `${this.hp*5}px`);
    $('.player-hp').css('animation', 'shake 1s linear');
    $('.spell').css('visibility', 'hidden');
    $('.spell').css('left', 305);
    this.addAnimationTakeDamage();
  }
  getHeal() {
    this.hp += 20;
    if (this.hp >= 100) {
      this.hp = 100;
    }
    $('.player-hp > span').css('width', `${this.hp*5}px`);
    $('.heal').css('visibility', 'hidden');
  }
  renderBody() {
    $('.conteiner').append('<img src="./src/components/Player/image/body.png" alt="mageBody" class="mage-body">');
    $('.conteiner').append('<img src="./src/components/Player/image/head.png" alt="mageBody" class="mage-head activeHead">');
    $('.conteiner').append('<img src="./src/components/Player/image/leftLeg.png" alt="mageBody" class="mage-leftLeg">');
    $('.conteiner').append('<img src="./src/components/Player/image/RightLeg.png" alt="mageBody" class="mage-RightLeg">');
    $('.conteiner').append('<img src="./src/components/Player/image/RightHand.png" alt="mageBody" class="mage-rightHand">');
    $('.conteiner').append('<img src="./src/components/Player/image/leftHand.png" alt="mageBody" class="mage-leftHand">');
    $('.conteiner').append('<img src="./src/components/Player/image/leftFinger.png" alt="mageBody" class="mage-leftFinger">');
    $('.conteiner').append('<img src="./src/components/Player/image/weapon.png" alt="mageBody" class="mage-weapon">');
    $('.player-Model .conteiner ').append('<img src="./src/components/Player/image/spells/frostbolt1.png" alt="spell_frostbolt" class="spell frostbolt">');
    $('.player-Model .conteiner ').append('<img src="./src/components/Player/image/spells/heal.png" alt="spell_heal" class="spell heal">');
  }
  async addAnimationAttack(name) {
    $('.placeModel').css('opacity', 1);
    $('.mage-body').addClass('mage-body_active');
    $('.mage-leftHand').addClass('mage-leftHand_active');
    $('.mage-rightHand').addClass('mage-rightHand_active');
    $('.mage-leftFinger').addClass('mage-leftFinger_active');
    $('.mage-leftLeg').addClass('mage-leftLeg_active');
    $('.mage-weapon').addClass('mage-weapon_active');
    this.addVoiceLine('frostbolt');
    await pause(1000);
    switch(name) {
      case 'frostbolt':
      $('.frostbolt').css('visibility', 'visible');
      break;
    }
    await pause(100);
    const position = $('.enemy-Model .conteiner').position().left;
    $('.frostbolt').css('left', position-20);
  }
  removeAnimations() {
    this.removeAnimationAttack();
    this.removeAnimationHealing();
    this.removeAnimationTakeDamage();
  }
  removeAnimationAttack() {
    $('.mage-body').removeClass('mage-body_active');
    $('.mage-leftHand').removeClass('mage-leftHand_active');
    $('.mage-rightHand').removeClass('mage-rightHand_active');
    $('.mage-leftFinger').removeClass('mage-leftFinger_active');
    $('.mage-leftLeg').removeClass('mage-leftLeg_active');
    $('.mage-weapon').removeClass('mage-weapon_active');
  }
  removeAnimationTakeDamage() {
    $('.mage-head').removeClass('mage-take-damage_head');
    $('.mage-body').removeClass('mage-take-damage_body');
    $('.mage-leftHand').removeClass('mage-take-damage_leftHand');
    $('.mage-rightHand').removeClass('mage-take-damage_rightHand');
    $('.mage-leftFinger').removeClass('mage-take-damage_leftFinger');
    $('.mage-leftLeg').removeClass('mage-take-damage_rightLeg');
    $('.mage-leftLeg').removeClass('mage-take-damage_leftLeg');
    $('.mage-weapon').removeClass('mage-take-damage_weapon');
  }
  removeAnimationHealing() {
    $('.mage-leftHand').removeClass('mage-take-heal_leftHand');
    $('.mage-rightHand').removeClass('mage-take-heal_rightHand');
    $('.mage-leftFinger').removeClass('mage-take-heal_leftFinger');
    $('.mage-weapon').removeClass('mage-take-heal_weapon');
  }
  async addAnimationTakeDamage() {
    $('.mage-head').removeClass('activeHead');
    $('.mage-head').addClass('mage-take-damage_head');
    $('.mage-body').addClass('mage-take-damage_body');
    $('.mage-leftHand').addClass('mage-take-damage_leftHand');
    $('.mage-rightHand').addClass('mage-take-damage_rightHand');
    $('.mage-leftFinger').addClass('mage-take-damage_leftFinger');
    $('.mage-leftLeg').addClass('mage-take-damage_rightLeg');
    $('.mage-leftLeg').addClass('mage-take-damage_leftLeg');
    $('.mage-weapon').addClass('mage-take-damage_weapon');
    this.addVoiceLine('takeDamage');
    await pause(500);
    $('.mage-head').addClass('activeHead');
  }
  addAnimationHealing() {
    $('.placeModel').css('opacity', 1);
    $('.mage-leftHand').addClass('mage-take-heal_leftHand');
    $('.mage-rightHand').addClass('mage-take-heal_rightHand');
    $('.mage-leftFinger').addClass('mage-take-heal_leftFinger');
    $('.mage-weapon').addClass('mage-take-heal_weapon');
    $('.heal').css('visibility', 'visible');
  }
  addVoiceLine(name) {
    switch(name) {
      case 'takeDamage':
      const takeDamage = new Audio('./src/components/Player/sounds/player_take_damage.wav');
      takeDamage.play();
      break;
      case 'frostbolt':
      const frostbolt = new Audio('./src/components/Player/sounds/frostbolt.wav');
      frostbolt.volume = 0.2;
      frostbolt.play();
      break;
    }
  }
};

const pause = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
