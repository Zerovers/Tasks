import {
  dmgEnemy,
  dmgPlayer,
  createNewEnemy,
  getRandom,
} from 'render';
import css from './index.css';
import htmlPazzle from './index.html';
import pazzleList from './pazzleList.json';

const html = $(htmlPazzle);
function renderPazzleMap() {
  const list = Object.keys(pazzleList);
  const rnd = getRandom(0, list.length);
  const rndKeys = list[rnd];
  return { list, rndKeys };
}

function renderPazzleContent() {
  const map = renderPazzleMap();
  html.find('#input-pazzle').val('');
  html.find('.pazzle-content').html(`Отгадайте загадку \n ${ map.rndKeys}`);
  $('body').append(html);
  html.find('#input-pazzle').focus();
  return pazzleList[map.rndKeys];
}

export function getPazzleEvent(object) {
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