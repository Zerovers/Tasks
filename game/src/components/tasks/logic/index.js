import './index.css';
import htmlLogic from './index.html';
import BattleArena from '../../../screens/battle';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  HEAL_SPELL_LIST,
} from '../../../constant';

const html = $(htmlLogic);
const LOGIC_INPUT = '#logic-form__input';
export default class LogicTask {
  static render(data) {
    const [rndKeys, result] = [data.rndKeys, data.answer];
    $(HEAL_SPELL_LIST).remove();
    $(MAIN_BODY).append(html);
    html.find(LOGIC_INPUT).val('').focus();
    html.find('.logic-content__text').html(`Ответье на вопрос:<br> ${rndKeys}`);
    html.find('.logic-form').submit(() => {
      LogicTask.getAnswerTask(result);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    const inputValue = $(LOGIC_INPUT).val();
    $(SHADOW_FRAME).css('display', 'none');
    $(BUTTON_START_FIGHT).prop('disabled', false);
    let count = 0;
    const translateAnswer = inputValue.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (translateAnswer === `${result[i]}`) {
        count += 1;
      }
    }
    if (count > 0) {
      LogicTask.deleteTask();
      BattleArena.startFight('heal', 'true');
    } else {
      LogicTask.deleteTask();
      BattleArena.startFight('heal', 'false');
    }
  }
}
