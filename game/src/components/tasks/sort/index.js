import './index.css';
import './jquery-ui/jquery-ui.min';
import htmlSort from './index.html';
import BattleArena from '../../../screens/battle';

const html = $(htmlSort);
export default class SortTask {
  static render(data) {
    $('.attack-spells-list').remove();
    const map = data;
    $('body').append(html);
    $('#sortable').html('');
    $('#sortable').sortable();
    $('#sortable').disableSelection();
    html.find('.sort__content').html('Составте правильное слово');
    for (let i = 0; i < map.rndKeys.split('').length; i += 1) {
      html.find('#sortable').append(`<li id='ui-state-default'>${map.rndKeys.split('')[i]}</li>`);
    }
    html.find('#sort__button').on('click', () => { this.getAnswerTask(data); });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(data) {
    $('.shadow').css('display', 'none');
    $('.button__start-fight').prop('disabled', false);
    const result = data;
    const children = $('#sortable').children('li');
    let sortAnswer = [];
    for (let i = 0; i < result.answer.length; i += 1) {
      sortAnswer.push(children[i].innerHTML);
    }
    sortAnswer = sortAnswer.join('');
    if (sortAnswer === result.answer) {
      SortTask.deleteTask();
      BattleArena.startFight('attack', 'true', 'arcaneblast');
    } else {
      SortTask.deleteTask();
      BattleArena.startFight('attack', 'true');
    }
  }
}
