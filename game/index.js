import { sortable } from './src/tasks/sortEvent/jquery-ui/jquery-ui.min'
import {
  renderElement,
  dmgEnemy,
  dmgPlayer,
  createNewEnemy,
  getRandom,
} from './render'
import css from './index.css';
import spellList from './src/spellComponent'

export const names = ['Хлебушек', 'Батон', 'Головяшка', 'Данунахер'];

class Player {
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
    console.log(this.hp);
    let hpBar = $('.enemy-hp');
    hpBar.html(this.hp);
  }
  indicationHp() {
    let hpBar = $('.enemy-hp');
    hpBar.html(this.hp);
  }
}

const player = new Player('Алеша', 100, 0);
let monster = new Enemy('Хлебушек', 100);

export { monster, player, Enemy };




monster.sayHi();
player.sayHi();

const startbattle = $('.button');
startbattle.on('click', (e) => {
  if (e.target) {
    spellList.render();
  }
})
