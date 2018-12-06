import {
  dmgEnemy,
  dmgPlayer,
  createNewEnemy,
  getRandom,
} from 'render';
import css from './index.css';
import htmlMath from './index.html';

const html = $(htmlMath);
function renderMathContent() {
  const sign = ['+', '-', '*', '/'];
  let firstNumber = getRandom(0, 10);
  let secondNumber = getRandom(0, 10);
  html.find('#input-math').val('');
  html.find('.math-operations').html(`${firstNumber} ${sign[getRandom(0, sign.length-1)]} ${secondNumber} = `);
  $('body').append(html);
  html.find('#input-math').focus();
  return { firstNumber, secondNumber };
}

function getMathOperation(obj) {
  let operation = $('.math-operations').html().split(' ')[1];
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

export function getMathEvent(object) {
  const spellMath = $('.spell-math');
  spellMath.on('click', (e) => {
    if (e.target) {
      const spellmenu = $('.context-menu');
      spellmenu.remove();
      let mathNumbers = renderMathContent();
      const input = $('#input-math');
      input.on('change', (event) => {
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
