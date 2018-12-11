import css from './index.css';
import htmlSort from './index.html';
import sortList from './sortList.json';
import { monster, player, Enemy, names } from 'index';

const html = $(htmlSort);
class sortTask {
  render(content) {
    const spellmenu = $('.context-menu');
    spellmenu.remove();
    const map = content;
    $('body').append(html);
    $("#sortable").sortable();
    $("#sortable").disableSelection();
    html.find('.sort-content').html('Составте правильное слово');
    for (let i = 0; i < map.rndKeys.split('').length; i += 1) {
      html.find('#sortable').append(`<li id='ui-state-default'>${map.rndKeys.split('')[i]}</li>`);
    }
    html.find('#sort-button').on('click', (event) => { this.getAnswerTask(content) });
  }
  deleteTask() {
    html.remove();
  }
  getAnswerTask(content) {
    const result = content;
    const children = $('#sortable').children('li');
    let sortAnswer = [];
    const quest = $('#sortable').children('li');
    for (let i = 0; i < result.answer.length; i += 1) {
      sortAnswer.push(children[i].innerHTML);
    }
    sortAnswer = sortAnswer.join('');
    if (sortAnswer === result.answer) {
      monster.getDamage();
      this.deleteTask();
    } else {
      player.getDamage();
      this.deleteTask();
    }
    // if (object.enemy.hp === 0) {
    //   createNewEnemy(object);
    // }
  }
}
let sorts = new sortTask();
export default sorts;
