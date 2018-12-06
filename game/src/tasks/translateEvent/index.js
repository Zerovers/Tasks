import {
  dmgEnemy,
  dmgPlayer,
  createNewEnemy,
  getRandom,
} from 'render';
import css from './index.css';
import htmlTranslate from './index.html';
import translateList from './translateList.json';

const html = $(htmlTranslate);
function renderNewTranslateMap() {
  const list = Object.keys(translateList);
  const rnd = getRandom(0, list.length);
  const rndKeys = list[rnd];
  return { list, rndKeys };
}

function renderTranslateContent() {
  let map = renderNewTranslateMap();
  html.find('#input-translate').val('');
  html.find('.translate-word').html(`Переведите ${map.rndKeys}`);
  $('body').append(html);
  html.find('#input-translate').focus();
  return translateList[map.rndKeys];
}

export function getTranslateEvent(object) {
  const spellTranslate = $('.spell-translate');
  spellTranslate.on('click', (e) => {
    if (e.target) {
      const spellmenu = $('.context-menu');
      spellmenu.remove();
      const result = renderTranslateContent();
      const input = $('#input-translate');
      input.on('change', (event) => {
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
