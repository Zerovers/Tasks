import {
  dmgEnemy,
  dmgPlayer,
  createNewEnemy,
  getRandom,
} from 'render';
import css from './index.css';
import htmlSort from './index.html';
import sortList from './sortList.json';

const html = $(htmlSort);
function renderSortContent() {
  const list = Object.keys(sortList);
  const rnd = getRandom(0, list.length);
  const rndKeys = list[rnd];
  $('body').append(html);
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
  html.find('.sort-content').html('Составте правильное слово');
  for (let i = 0; i < rndKeys.split('').length; i += 1) {
    html.find('#sortable').append(`<li id='ui-state-default'>${rndKeys.split('')[i]}</li>`);
  }
  
  return sortList[list[rnd]];
}

export function getSortEvent(object) {
  const spellSort = $('.spell-sort');
  spellSort.on('click', (e) => {
    if (e.target) {
      const spellmenu = $('.context-menu');
      spellmenu.remove();
      const result = renderSortContent();
      const children = $('#sortable').children('li');
      let sortAnswer = [];
      const input = $('#sort-button');
      input.on('click', (event) => {
        const quest = $('#sortable').children('li');
        for (let i = 0; i < result.length; i += 1) {
          sortAnswer.push(children[i].innerHTML);
        }
        sortAnswer = sortAnswer.join('');
        if (sortAnswer === result) {
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