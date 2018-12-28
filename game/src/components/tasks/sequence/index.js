import './index.css';
import htmlSequence from './index.html';
import BattleArena from '../../../screens/battle';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  ATTACK_SPELL_LIST,
} from '../../../constant';

const html = $(htmlSequence);
const SEQUENCE_INPUT = '#sequence-form__input';
export default class SequenceTask {
  static render(data) {
    const [rndNumber, rndDiff] = [data.rndNumber, data.rndDiff];
    $(ATTACK_SPELL_LIST).remove();
    $(MAIN_BODY).append(html);
    html.find(SEQUENCE_INPUT).val('').focus();
    html.find('.sequence-content__number').html(`Продолжите последовательность цифр<br> <span>${rndNumber}</span>
    <span>${rndNumber + rndDiff}</span>
    <span>${rndNumber + rndDiff * 2}</span> <span>?</span>`);
    html.find(SEQUENCE_INPUT).focus();
    html.find('#sequence-form').submit(() => {
      SequenceTask.getAnswerTask(rndNumber, rndDiff);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(rndNumber, rndDiff) {
    const inputValue = $(SEQUENCE_INPUT).val();
    $(SHADOW_FRAME).css('display', 'none');
    $(BUTTON_START_FIGHT).prop('disabled', false);
    if (inputValue === `${rndNumber + rndDiff * 3}`) {
      SequenceTask.deleteTask();
      BattleArena.startFight('attack', 'true', 'arcanemissile');
    } else {
      SequenceTask.deleteTask();
      BattleArena.startFight('attack', 'false');
    }
  }
}
