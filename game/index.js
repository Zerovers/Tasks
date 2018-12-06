import { sortable } from './jquery-ui/jquery-ui.min'

const names = ['Хлебушек', 'Батон', 'Головяшка', 'Данунахер'];

const grammaticList = ['cat', 'dog', 'pig', 'mother', 'father', 'sister', 'brother', 'family'];

let translateList = new Map();
translateList.set('cat', ['кот', 'котик', 'кошка']);
translateList.set('dog', ['собака', 'собачка']);
translateList.set('sun', ['солнце', 'солнышко']);
translateList.set('home', ['дом', 'дома']);

const pazzleList = new Map();
pazzleList.set('Висит груша, нельзя скушать, что это?', ['лампочка','лампа']);
pazzleList.set('Hе огонь, а жжётся', ['крапива']);

const speechList = ['cat', 'dog', 'pig', 'mother', 'father', 'sister', 'brother', 'family'];
let voices = speechSynthesis.getVoices();

const logicList = new Map();


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

class Enemy {
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
    // getLogicEvent({ player, enemy, names });
    getSortEvent({ player, enemy, names });
  }
})


function renderElement(name, obj) {
  const element = document.createElement(name);
  Object.getOwnPropertyNames(obj).forEach((e) => {
    element[e] = obj[e];
  });
  return element;
}

function dmgEnemy(object, input) {
  object.enemy.getDamage();
  object.enemy.indicationHp();
  input.closest('div').remove();
}

function dmgPlayer(object, input) {
  object.player.getDamage();
  object.player.indicationHp();
  input.closest('div').remove();
}

function healPlayer(object, input) {
  object.player.getHeal();
  object.player.indicationHp();
  input.closest('div').remove();
}

function createNewEnemy(object) {
  const rnd = getRandom(0, object.names.length);
  enemy = new Enemy(object.names[rnd], 100);
  enemy.indicationHp();
  object.player.killMonsters();
  console.log(object.enemy.name);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

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

function renderMathContent() {
  const sign = ['+', '-', '*', '/'];
  let firstNumber = getRandom(0, 10);
  let secondNumber = getRandom(0, 10);
  const div = renderElement('div', { className: 'math' });
  const p = renderElement('p', { className: 'math-operations', innerHTML: `${firstNumber} ${sign[getRandom(0, sign.length-1)]} ${secondNumber}` });
  const input = renderElement('input', { type: 'number', id: 'input-math' });
  div.appendChild(p);
  div.appendChild(input);
  document.body.appendChild(div);
  return { firstNumber, secondNumber };
}

function getMathOperation(obj) {
  let operation = document.querySelector('.math-operations').innerText.split(' ')[1];
  let result = 0;
  switch (operation) {
    case '-':
      result = obj.firstNumber - obj.secondNumber;
      break;
    case '+':
      result = obj.firstNumber + obj.secondNumber;
      break;
    case '*':
      result = obj.firstNumber * obj.secondNumber;
      break;
    case '/':
      result = Math.round((obj.firstNumber / obj.secondNumber) * 10) / 10;
      break;
  }
  return result;
}

function getMathEvent(object) {
  const spellMath = document.querySelector('.spell-math');
  spellMath.addEventListener('click', (e) => {
    if (e.target) {
      const spellmenu = document.querySelector('.context-menu');
      spellmenu.remove();
      let mathNumbers = renderMathContent();
      const input = document.querySelector('#input-math');
      input.addEventListener('change', (event) => {
        const result = getMathOperation(mathNumbers);
        if (event.target.value === result + '') {
          dmgEnemy(object, input);
        } else {
          dmgPlayer(object, input);
        }
        if (object.enemy.hp === 0) {
        createNewEnemy(object);
        }
      })
    }
  })
}

function renderComparisonContent() {
  let sign;
  let firstNumber = getRandom(1,100);
  let secondNumber = getRandom(1,100);
  if (firstNumber > secondNumber) {
    sign = '>';
  } else if (firstNumber < secondNumber) {
    sign = '<';
  } else {
    sign = '=';
  }
  const div = renderElement('div', { className: 'comparison' });
  const p = renderElement('p', { className: 'comparison-operations', innerHTML: `${firstNumber} ? ${secondNumber}` });
  const input = renderElement('input', { type: 'text', id: 'input-comparison' });
  div.appendChild(p);
  div.appendChild(input);
  document.body.appendChild(div);
  return { firstNumber, secondNumber, sign };
}

function getComparisonEvent(object) {
  const spellComparison = document.querySelector('.spell-comparison');
  spellComparison.addEventListener('click', (e) => {
    if (e.target) {
      const spellmenu = document.querySelector('.context-menu');
      spellmenu.remove();
      const result = renderComparisonContent().sign;
      const input = document.querySelector('#input-comparison');
      input.addEventListener('change', (event) => {
        if (event.target.value === result + '') {
          dmgEnemy(object, input);
        } else {
          dmgPlayer(object, input);
        }
        if (object.enemy.hp === 0) {
        createNewEnemy(object);
        }
      })
    }
  })
}

function renderGrammaticContent(list) {
  const rndList = list[getRandom(0, list.length)];
  const div = renderElement('div', { className: 'grammatic' });
  const p = renderElement('p', { className: 'grammatic-word', innerHTML: `Произнесите ${rndList}` });
  div.appendChild(p);
  document.body.appendChild(div);
  return rndList; 
}

function getGrammaticEvent(object) {
  const spellGrammatic = document.querySelector('.spell-grammatic');
  spellGrammatic.addEventListener('click', (e) => {
    if (e.target) {
      const spellmenu = document.querySelector('.context-menu');
      spellmenu.remove();    
      let word = renderGrammaticContent(grammaticList);
      let recognizer = new webkitSpeechRecognition();
      recognizer.interimResults = false;
      recognizer.maxAlternatives = 1;
      recognizer.lang = 'en-US';
      recognizer.start();
      recognizer.onresult = (event) => {
        const input = document.querySelector('.grammatic-word');
        let result = event.results[0][0].transcript;
        if (word === result) {
          dmgEnemy(object, input);
        } else {
          dmgPlayer(object, input);
        }
        if (object.enemy.hp === 0) {
          createNewEnemy(object);
        }
      }
    }
  })
}

function renderNewTranslateMap(list) {
  const rnd = Math.floor(Math.random() * list.size);
  const rndKeys = (Array.from(list.keys()))[rnd];
  return { list, rndKeys };
}

function renderTranslateContent() {
  let map = renderNewTranslateMap(translateList);
  const div = renderElement('div', { className: 'translate' });
  const p = renderElement('p', { className: 'translate-word', innerHTML: `Переведите ${map.rndKeys}` });
  const input = renderElement('input', { type: 'text', id: 'input-translate' });
  div.appendChild(p);
  div.appendChild(input);
  document.body.appendChild(div);
  return map.list.get(map.rndKeys);
}

function getTranslateEvent(object) {
  const spellTranslate = document.querySelector('.spell-translate');
  spellTranslate.addEventListener('click', (e) => {
    if (e.target) {
      const spellmenu = document.querySelector('.context-menu');
      spellmenu.remove();
      const result = renderTranslateContent();
      const input = document.querySelector('#input-translate');
      input.addEventListener('change', (event) => {
        let count = 0;
        const translateAnswer = event.target.value.toLowerCase();
        for (let i = 0; i < result.length; i += 1) {
          if (translateAnswer === result[i]) {
            count += 1;
          }        
        }
        if (count > 0) {
          dmgEnemy(object, input);
        } else {
          dmgPlayer(object, input);
        }
        if(object.enemy.hp === 0) {
          createNewEnemy(object);
        }
      })
    }
  })
}

function renderSequenceContent() {
  const rndNumber = getRandom(10, 100);
  const rndDiff = getRandom(5, 10);
  const div = renderElement('div', { className: 'sequence' });
  const p = renderElement('p', { ClassName: 'sequence-number', innerHTML: `Продолжите последовательность цифр\n ${rndNumber} ${rndNumber+rndDiff} ${rndNumber+rndDiff*2} ?` })
  const input = renderElement('input', { type: 'number', id: 'input-sequence' });
  div.appendChild(p);
  div.appendChild(input);
  document.body.appendChild(div);
  return { rndNumber, rndDiff };
}

function getSequenceEvent(object) {
  const spellSequence = document.querySelector('.spell-sequence');
  spellSequence.addEventListener('click', (e) => {
    if (e.target) {
      const spellmenu = document.querySelector('.context-menu');
      spellmenu.remove();
      const result = renderSequenceContent();
      const input = document.querySelector('#input-sequence');
      input.addEventListener('change', (event) => {
        if (event.target.value === result.rndNumber + result.rndDiff*3 + '') {
          dmgEnemy(object, input);
        } else {
          dmgPlayer(object, input);
        }
        if (object.enemy.hp === 0) {
          createNewEnemy(object);
        }
      })
    }
  })
}

function renderPazzleMap(list) {
  const rnd = Math.floor(Math.random() * list.size);
  const rndKeys = (Array.from(list.keys()))[rnd];
  return { list, rndKeys };
}

function renderPazzleContent() {
  const map = renderPazzleMap(pazzleList);
  const div = renderElement('div', { className: 'pazzle' });
  const p = renderElement('p', { className: 'pazzle-content', innerHTML: `Отгадайте загадку \n ${ map.rndKeys}` });
  const input = renderElement('input', { type: 'text', id: 'input-pazzle' });
  div.append(p);
  div.append(input);
  document.body.append(div);
  return map.list.get(map.rndKeys);
}

function getPazzleEvent(object) {
  const spellPazzle = $('.spell-pazzle');
  spellPazzle.on('click', (e) => {
    if (e.target) {
      const spellmenu = $('.context-menu');
      spellmenu.remove();
      const result = renderPazzleContent();
      const input = $('#input-pazzle');
      input.on('change', (event) => {
        let count = 0;
        const pazzleAnswer = event.target.value.toLowerCase();
        for (let i = 0; i < result.length; i += 1) {
          if (pazzleAnswer === result[i]) {
            count += 1;
          }        
        }
        if (count > 0) {
          dmgEnemy(object, input);
        } else {
          dmgPlayer(object, input);
        }
        if(object.enemy.hp === 0) {
          createNewEnemy(object);
        }
      })
    }
  })
}

function speech(message) {
  let msg = new SpeechSynthesisUtterance(message);
  msg.pitch = 1;
  msg.rate = 0.8;
  voices = speechSynthesis.getVoices();
  msg.voice = voices[3];
  speechSynthesis.speak(msg)
}

function renderSpeechContent(list) {
  const rnd = getRandom(0, list.length-1);
  const div = renderElement('div', { className: 'speech' });
  const p = renderElement('p', { className: 'speech-content', innerHTML: 'Впишите слово которое услышали' });
  const input = renderElement('input', { type: 'text', id: 'input-speech' });
  div.appendChild(p);
  div.appendChild(input);
  document.body.appendChild(div);
  return list[rnd];
}

function getSpeechEvent(object) {
  const spellSpeech = document.querySelector('.spell-speech');
  spellSpeech.addEventListener('click', (e) => {
    if (e.target) {
      const spellmenu = document.querySelector('.context-menu');
      spellmenu.remove();
      const result = renderSpeechContent(speechList);
      speech(result);
      const input = document.querySelector('#input-speech');
      input.addEventListener('change', (event) => {
        const speechAnswer = event.target.value.toLowerCase();
        if (speechAnswer === result) {
          healPlayer(object, input);
        } else {
          dmgEnemy(object, input);
        }
        if (object.enemy.hp === 0) {
          createNewEnemy(object);
        }
      })
    }
  })
}

function renderSortContent() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
}

function getSortEvent(object) {
  const spellSort = $('.spell-sort');
  spellSort.on('click', (e) => {
    if (e.target) {
      const spellmenu = $('.context-menu');
      spellmenu.remove();
      const result = 'pdr';
      const ul = renderElement('ul', { id: 'sortable' });
      const li1 = renderElement('li', { id: 'ui-state-default' });
      const li2 = renderElement('li', { id: 'ui-state-default' });
      $('body').append(`<div class="ololo">${result}</div>`);
      li1.append('wow');
      ul.append(li1);
      ul.append(li2);
      document.body.append(ul);
      renderSortContent();
    }
  })
}

