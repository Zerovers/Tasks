import {
  dmgEnemy,
  dmgPlayer,
  createNewEnemy,
  getRandom,
} from 'render';
import css from './index.css';
import htmlSequence from './index.html';

const html = $(htmlSequence);
function renderSequenceContent() {
  const rndNumber = getRandom(10, 100);
  const rndDiff = getRandom(5, 10);
  html.find('#input-sequence').val('');
  html.find('.sequence-number').html(`Продолжите последовательность цифр\n ${rndNumber} ${rndNumber+rndDiff} ${rndNumber+rndDiff*2} ?`);
  $('body').append(html);
  html.find('#input-sequence').focus();
  return { rndNumber, rndDiff };
}

export function getSequenceEvent(object) {
  const spellSequence = $('.spell-sequence');
  spellSequence.on('click', (e) => {
    if (e.target) {
      const spellmenu = $('.context-menu');
      spellmenu.remove();
      const result = renderSequenceContent();
      const input = $('#input-sequence');
      input.on('change', (event) => {
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