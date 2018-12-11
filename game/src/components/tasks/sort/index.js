import css from './index.css';
import htmlSort from './index.html';
import sortList from './sortList.json';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

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
    if (monster.hp === 0) {
      monster.name = `${names.firstName[_.random(0,names.firstName.length - 1)]} 
      ${names.secondName[_.random(0,names.secondName.length - 1)]} 
      ${names.thirdName[_.random(0,names.thirdName.length - 1)]}`;
      console.log(monster.name);
      monster.hp = 100;
      monster.indicationHp();
      player.killMonsters();
    }
  }
}
let sorts = new sortTask();
export default sorts;
