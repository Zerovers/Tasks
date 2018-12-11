export default class Enemy {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
  }
  sayHi() {
    console.log(`Я злой и страшный ${this.name} и у меня ${this.hp} жизней`);
  }
  getDamage() {
    this.hp -= 50;
    let hpBar = $('.enemy-hp');
    hpBar.html(this.hp);
  }
  indicationHp() {
    let hpBar = $('.enemy-hp');
    hpBar.html(this.hp);
  }
}
