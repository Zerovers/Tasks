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
  }
  getHeal() {
    this.hp += 20;
    if (this.hp >= 100) {
      this.hp = 100;
    }
  }
  renderBody() {
    $('.conteiner').append('<img src="./src/components/Player/image/body.png" alt="mageBody" class="mage-body">');
    $('.conteiner').append('<img src="./src/components/Player/image/head.png" alt="mageBody" class="mage-head">');
    $('.conteiner').append('<img src="./src/components/Player/image/leftLeg.png" alt="mageBody" class="mage-leftLeg">');
    $('.conteiner').append('<img src="./src/components/Player/image/RightLeg.png" alt="mageBody" class="mage-RightLeg">');
    $('.conteiner').append('<img src="./src/components/Player/image/RightHand.png" alt="mageBody" class="mage-rightHand">');
    $('.conteiner').append('<img src="./src/components/Player/image/leftHand.png" alt="mageBody" class="mage-leftHand">');
    $('.conteiner').append('<img src="./src/components/Player/image/leftFinger.png" alt="mageBody" class="mage-leftFinger">');
    $('.conteiner').append('<img src="./src/components/Player/image/weapon.png" alt="mageBody" class="mage-weapon">');
  }
  addAnimation() {
    // $('.mage-head').addClass('mage-head_active');
    $('.placeModel').css('opacity', 1);
    $('.mage-body').addClass('mage-body_active');
    $('.mage-leftHand').addClass('mage-leftHand_active');
    $('.mage-leftFinger').addClass('mage-leftFinger_active');
    $('.mage-leftLeg').addClass('mage-leftLeg_active');
    $('.mage-weapon').addClass('mage-weapon_active');
  }
  removeAnimation() {
    // $('.mage-head').removeClass('mage-head_active');
    $('.mage-body').removeClass('mage-body_active');
    $('.mage-leftHand').removeClass('mage-leftHand_active');
    $('.mage-leftFinger').removeClass('mage-leftFinger_active');
    $('.mage-leftLeg').removeClass('mage-leftLeg_active');
    $('.mage-weapon').removeClass('mage-weapon_active');
  }
};
