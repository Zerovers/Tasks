import './index.css';
import htmlTranslate from './index.html';
import BattleArena from '../../../screens/battle';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  ATTACK_SPELL_LIST,
} from '../../../constant';

const html = $(htmlTranslate);
const TRANSLATE_INPUT = '#translate-form__input';
export default class TranslateTask {
  static render(data) {
    const [rndKeys, result] = [data.rndKeys, data.answer];
    $(ATTACK_SPELL_LIST).remove();
    $(MAIN_BODY).append(html);
    html.find(TRANSLATE_INPUT).val('').focus();
    html.find('.translate-content__text').html(`Переведите <span>${rndKeys}</span>`);
    html.find('#translate-form').submit(() => {
      TranslateTask.getAsnwerTask(result);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAsnwerTask(result) {
    const inputValue = $(TRANSLATE_INPUT).val();
    $(SHADOW_FRAME).css('display', 'none');
    $(BUTTON_START_FIGHT).prop('disabled', false);
    let count = 0;
    const translateAnswer = inputValue.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (translateAnswer === result[i]) {
        count += 1;
      }
    }
    if (count > 0) {
      TranslateTask.deleteTask();
      BattleArena.startFight('attack', 'true', 'shadowbolt');
    } else {
      TranslateTask.deleteTask();
      BattleArena.startFight('attack', 'false');
    }
  }
}
