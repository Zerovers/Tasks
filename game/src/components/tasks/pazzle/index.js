import './index.css';
import htmlPazzle from './index.html';
import BattleArena from '../../../screens/battle';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  HEAL_SPELL_LIST,
} from '../../../constant';

const html = $(htmlPazzle);
const PAZZLE_INPUT = '#pazzle-form__input';
export default class PazzleTask {
  static render(data) {
    const [rndKeys, result] = [data.rndKeys, data.answer];
    $(HEAL_SPELL_LIST).remove();
    $(MAIN_BODY).append(html);
    html.find(PAZZLE_INPUT).val('').focus();
    html.find('.pazzle-content__text').html(`Отгадайте загадку:<br> ${rndKeys}`);
    html.find('.pazzle-form').submit(() => {
      PazzleTask.getAnswerTask(result);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    let count = 0;
    const inputValue = $(PAZZLE_INPUT).val();
    $(SHADOW_FRAME).css('display', 'none');
    $(BUTTON_START_FIGHT).prop('disabled', false);
    const pazzleAnswer = inputValue.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (pazzleAnswer === result[i]) {
        count += 1;
      }
    }
    if (count > 0) {
      PazzleTask.deleteTask();
      BattleArena.startBattle('heal', 'true');
    } else {
      PazzleTask.deleteTask();
      BattleArena.startBattle('heal', 'false');
    }
  }
}
