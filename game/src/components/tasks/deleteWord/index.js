import './index.css';
import htmlDeleteWord from './index.html';
import BattleArena from '../../../screens/battle';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  HEAL_SPELL_LIST,
} from '../../../constant';

const html = $(htmlDeleteWord);
const DELETE_WORD_INPUT = '#delete-word-form__input';
export default class DeleteWordTask {
  static render(data) {
    const [rndKeys, result] = [data.rndKeys, data.answer];
    $(HEAL_SPELL_LIST).remove();
    $(MAIN_BODY).append(html);
    html.find(DELETE_WORD_INPUT).val('').focus();
    html.find('.delete-word-content__text').html(`${rndKeys}`);
    html.find('.delete-word-form').submit(() => {
      DeleteWordTask.getAnswerTask(result);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    const inputValue = $(DELETE_WORD_INPUT).val();
    $(SHADOW_FRAME).css('display', 'none');
    $(BUTTON_START_FIGHT).prop('disabled', false);
    let count = 0;
    const answer = inputValue.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (answer === result[i]) {
        count += 1;
      }
    }
    if (count > 0) {
      DeleteWordTask.deleteTask();
      BattleArena.startBattle('heal', 'true');
    } else {
      DeleteWordTask.deleteTask();
      BattleArena.startBattle('heal', 'false');
    }
  }
}
