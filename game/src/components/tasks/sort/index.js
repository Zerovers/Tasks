import css from './index.css';
import { sortable } from './jquery-ui/jquery-ui.min.js';
import htmlSort from './index.html';
import sortList from './sortList.json';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';
import pause from '../../utils/index';

const html = $(htmlSort);
class sortTask {
  render(content) {
    $('.attack-spells-list').remove();
    const map = content;
    $('body').append(html);
    $('#sortable').html('');
    $("#sortable").sortable();
    $("#sortable").disableSelection();
    html.find('.sort__content').html('Составте правильное слово');
    for (let i = 0; i < map.rndKeys.split('').length; i += 1) {
      html.find('#sortable').append(`<li id='ui-state-default'>${map.rndKeys.split('')[i]}</li>`);
    }
    html.find('#sort__button').on('click', (event) => { this.getAnswerTask(content); $('.shadow').css('display', 'none'); $('.button').prop('disabled', false); });
  }
  deleteTask() {
    html.remove();
  }
  async getAnswerTask(content) {
    const result = content;
    const children = $('#sortable').children('li');
    let sortAnswer = [];
    const quest = $('#sortable').children('li');
    for (let i = 0; i < result.answer.length; i += 1) {
      sortAnswer.push(children[i].innerHTML);
    }
    sortAnswer = sortAnswer.join('');
    if (sortAnswer === result.answer) {
      this.deleteTask();
      player.addAnimationAttack('arcaneblast');
      await pause(1500);
      monster.getDamage();
    } else {
      this.deleteTask();
      monster.addAnimationAttack();
      await pause(1000);
      player.getDamage();
    }
    if (monster.hp === 0) {
      monster.name = `${names.firstName[_.random(0,names.firstName.length - 1)]} 
      ${names.secondName[_.random(0,names.secondName.length - 1)]} 
      ${names.thirdName[_.random(0,names.thirdName.length - 1)]}`;
      await pause(1000);
      monster.hp = 100;
      monster.newMonster = _.random(1,3);
      monster.indicationHp();
      monster.renderBody();
      player.killMonsters();
      player.damage = player.damage + 5;
    }
  }
}
let sorts = new sortTask();
export default sorts;
