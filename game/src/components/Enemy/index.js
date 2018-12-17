import css from './index.css';

export default class Enemy {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
    $('.enemy-name').html(this.name);
  }
  sayHi() {
    console.log(`Я злой и страшный ${this.name} и у меня ${this.hp} жизней`);
  }
  getDamage() {
    this.hp -= 50;
    $('.enemy-hp span').css('width', `${this.hp * 5}px`);
    $('.enemy-hp').css('animation', 'shake 1s linear');
  }
  indicationHp() {
    $('.enemy-name').html(this.name);
    $('.enemy-hp span').css('width', `${this.hp * 5}px`);
  }
  renderBody() {
    $('.enemy-Model .conteiner').html('');
    const monster = _.random(1, 3);
    switch (monster) {
      case 1:
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/head.png" alt="enemyBody" class="enemy-head"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/body.png" alt="enemyBody" class="enemy-body"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/rightHand.png" alt="enemyBody" class="enemy-rightHand"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/leftHand.png" alt="enemyBody" class="enemy-leftHand"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/rightLeg.png" alt="enemyBody" class="enemy-rightLeg"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_1/leftLeg.png" alt="enemyBody" class="enemy-leftLeg"></img>');
        break;
      case 2:
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/head.png" alt="enemyBody" class="enemy-head-orc"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/body.png" alt="enemyBody" class="enemy-body-orc"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/rightHand.png" alt="enemyBody" class="enemy-rightHand-orc"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/leftHand.png" alt="enemyBody" class="enemy-leftHand-orc"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/rightLeg.png" alt="enemyBody" class="enemy-rightLeg-orc"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/leftLeg.png" alt="enemyBody" class="enemy-leftLeg-orc"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_2/weapon.png" alt="enemyBody" class="enemy-weapon-orc"></img>');
        break;
        case 3:
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/head.png" alt="enemyBody" class="enemy-head"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/body.png" alt="enemyBody" class="enemy-body-troll"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/rightHand.png" alt="enemyBody" class="enemy-rightHand-troll"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/leftHand.png" alt="enemyBody" class="enemy-leftHand"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/rightLeg.png" alt="enemyBody" class="enemy-rightLeg"></img>');
        $('.enemy-Model .conteiner').append('<img src="./src/components/Enemy/image/monster_3/leftLeg.png" alt="enemyBody" class="enemy-leftLeg"></img>');
    }

  }
}
