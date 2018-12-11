export default class Player {
  constructor(name, hp, countMonsters) {
    this.name = name;
    this.hp = hp;
    this.countMonsters = countMonsters;
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
    let hpBar = $('.player-hp');
    hpBar.html(this.hp);
  }
  getHeal() {
    this.hp += 20;
    if (this.hp >= 100) {
      this.hp = 100;
    }
  }
};
