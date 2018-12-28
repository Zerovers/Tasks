import './index.css';
import './jquery-ui/jquery-ui.min';
import htmlSort from './index.html';
import BattleArena from '../../../screens/battle';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  ATTACK_SPELL_LIST,
} from '../../../constant';

const html = $(htmlSort);
const SORT_ITEMS = '#sortable__items';
export default class SortTask {
  static render(data) {
    $(ATTACK_SPELL_LIST).remove();
    const map = data;
    $(MAIN_BODY).append(html);
    $(SORT_ITEMS).html('');
    $(SORT_ITEMS).sortable();
    $(SORT_ITEMS).disableSelection();
    html.find('.sort-content__text').html('Составте правильное слово');
    for (let i = 0; i < map.rndKeys.split('').length; i += 1) {
      html.find(SORT_ITEMS).append(`<li id='ui-state-default'>${map.rndKeys.split('')[i]}</li>`);
    }
    html.find('#sort__button').on('click', () => { this.getAnswerTask(data); });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(data) {
    $(SHADOW_FRAME).css('display', 'none');
    $(BUTTON_START_FIGHT).prop('disabled', false);
    const result = data;
    const children = $(SORT_ITEMS).children('li');
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
