import {
  dmgEnemy,
  dmgPlayer,
  createNewEnemy,
  getRandom,
} from 'render';
import css from './index.css';
import htmlLogic from './index.html';
import logicList from './logicList.json';

const html = $(htmlLogic);
function renderNewLogicMap() {
  const list = Object.keys(logicList);
  const rnd = getRandom(0, list.length);
  const rndKeys = list[rnd];
  return { list, rndKeys };
}
function renderLogicContent() {
  let map = renderNewLogicMap();
  html.find('#input-logic').val('');
  html.find('.logic-content').html(`Ответье на вопрос ${map.rndKeys}`);
  $('body').append(html);
  html.find('#input-logic').focus();
  return logicList[map.rndKeys];
}
export function getLogicEvent(object) {
  const spellTranslate = $('.spell-logic');
  spellTranslate.on('click', (e) => {
    if (e.target) {
      const spellmenu = $('.context-menu');
      spellmenu.remove();
      const result = renderLogicContent();
      const input = $('#input-logic');
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