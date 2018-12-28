import './index.css';
import htmlCompasion from './index.html';
import BattleArena from '../../../screens/battle';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  ATTACK_SPELL_LIST,
} from '../../../constant';

const html = $(htmlCompasion);
const COMPARISON_INPUT = '#comparison-form__input';
export default class ComparisonTask {
  static render(data) {
    const [firstNumber, secondNumber] = [data.firstNumber, data.secondNumber];
    const result = data.sign;
    $(ATTACK_SPELL_LIST).remove();
    $(MAIN_BODY).append(html);
    html.find(COMPARISON_INPUT).val('').focus();
    html.find('.comparison-content__operations').html(`${firstNumber} <span style="color: red">?</span> ${secondNumber}`);
    html.find('.comparison-form').submit(() => {
      ComparisonTask.getAnswerTask(result);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    const inputValue = $(COMPARISON_INPUT).val();
    $(SHADOW_FRAME).css('display', 'none');
    $(BUTTON_START_FIGHT).prop('disabled', false);
    if (inputValue === `${result}`) {
      ComparisonTask.deleteTask();
      BattleArena.startFight('attack', 'true', 'fireball');
    } else {
      ComparisonTask.deleteTask();
      BattleArena.startFight('attack', 'false');
    }
  }
}
