import {
  dmgEnemy,
  dmgPlayer,
  createNewEnemy,
  getRandom,
} from 'render';
import css from './index.css';
import htmlCompasion from './index.html';

const html = $(htmlCompasion)
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
  html.find('#input-comparison').val('');
  html.find('.comparison-operations').html(`${firstNumber} ? ${secondNumber}`);
  $('body').append(html);
  html.find('#input-comparison').focus();
  return { firstNumber, secondNumber, sign };
}
export function getComparisonEvent(object) {
  const spellComparison = $('.spell-comparison');
  spellComparison.on('click', (e) => {
    if (e.target) {
      const spellmenu = $('.context-menu');
      spellmenu.remove();
      const result = renderComparisonContent().sign;
      const input = $('#input-comparison');
      input.on('change', (event) => {
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
