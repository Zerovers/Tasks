import './index.css';
import htmlSequence from './index.html';
import BattleArena from '../../../screens/battle';

const html = $(htmlSequence);
export default class SequenceTask {
  static render(data) {
    const [rndNumber, rndDiff] = [data.rndNumber, data.rndDiff];
    $('.attack-spells-list').remove();
    html.find('#sequence__input').val('');
    html.find('.sequence__content__number').html(`Продолжите последовательность цифр<br> <span>${rndNumber}</span>
    <span>${rndNumber + rndDiff}</span>
    <span>${rndNumber + rndDiff * 2}</span> <span>?</span>`);
    $('body').append(html);
    html.find('#sequence__input').focus();
    html.find('#sequence').submit(() => {
      SequenceTask.getAnswerTask(rndNumber, rndDiff);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(rndNumber, rndDiff) {
    const inputValue = $('#sequence__input').val();
    $('.shadow').css('display', 'none');
    $('.button__start-fight').prop('disabled', false);
    if (inputValue === `${rndNumber + rndDiff * 3}`) {
      SequenceTask.deleteTask();
      BattleArena.startFight('attack', 'true', 'arcanemissile');
    } else {
      SequenceTask.deleteTask();
      BattleArena.startFight('attack', 'false');
    }
  }
}
