import { sortable } from './jquery-ui/jquery-ui.min'
import {
  getMathEvent,
  getComparisonEvent,
  getGrammaticEvent,
  getTranslateEvent,
  getSequenceEvent,
  getPazzleEvent,
  getSpeechEvent,
  getLogicEvent,
  getSortEvent,
} from './src/tasks/';
import {
  renderElement,
  dmgEnemy,
  dmgPlayer,
  createNewEnemy,
  getRandom,
} from './render'
import css from './index.css';

const names = ['Хлебушек', 'Батон', 'Головяшка', 'Данунахер'];

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
  }
  indicationHp() {
    let hp = document.querySelector('.player-hp');
    hp.innerHTML = this.hp;
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
  }
  indicationHp() {
    let hp = document.querySelector('.enemy-hp');
    hp.innerHTML = this.hp;
  }
}

let player = new Player('Алеша', 100, 0);
player.sayHi();
let enemy = new Enemy('Хлебушек', 100);
enemy.sayHi();

const startbattle = document.querySelector('.button');
startbattle.addEventListener('click', (e) => {
  if (e.target) {
    renderContextMenu();
    getMathEvent({ player, enemy, names });
    getComparisonEvent({ player, enemy, names });
    getGrammaticEvent({ player, enemy, names });
    getTranslateEvent({ player, enemy, names });
    getSequenceEvent({ player, enemy, names });
    getPazzleEvent({ player, enemy, names });
    getSpeechEvent({ player, enemy, names });
    getLogicEvent({ player, enemy, names });
    getSortEvent({ player, enemy, names });
  }
})

function renderContextMenu() {
  const contextMenu = renderElement('div', { className: 'context-menu' });
  const spellMath = renderElement('div', { className: 'spell-math', innerHTML: 'Math' });
  const spellComparison = renderElement('div', { className: 'spell-comparison', innerHTML: 'comparison'});
  const spellGrammatic = renderElement('div', { className: 'spell-grammatic', innerHTML: 'Grammatic' });
  const spellTranslate = renderElement('div', { className: 'spell-translate', innerHTML: 'Translate'});
  const spellSequence = renderElement('div', { className: 'spell-sequence', innerHTML: 'sequence' });
  const spellPazzle = renderElement('div', { className: 'spell-pazzle', innerHTML: 'pazzle' });
  const spellSpeech = renderElement('div', { className: 'spell-speech', innerHTML: 'speech' });
  const spellSort = renderElement('div', { className: 'spell-sort', innerHTML: 'sort' });
  const spellLogic = renderElement('div', { className: 'spell-logic', innerHTML: 'logic '});
  contextMenu.appendChild(spellMath);
  contextMenu.appendChild(spellComparison);
  contextMenu.appendChild(spellGrammatic);
  contextMenu.appendChild(spellTranslate);
  contextMenu.appendChild(spellSequence);
  contextMenu.appendChild(spellPazzle);
  contextMenu.appendChild(spellSpeech);
  contextMenu.appendChild(spellSort);
  contextMenu.appendChild(spellLogic);
  document.body.appendChild(contextMenu);
}





