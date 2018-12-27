import './index.css';
import htmlCompasion from './index.html';
import BattleArena from '../../../screens/battle';

const html = $(htmlCompasion);
export default class ComparisonTask {
  static render(data) {
    const [firstNumber, secondNumber] = [data.firstNumber, data.secondNumber];
    const result = data.sign;
    $('.attack-spells-list').remove();
    html.find('#comparison__input').val('');
    html.find('.comparison__content__operations').html(`${firstNumber} <span style="color: red">?</span> ${secondNumber}`);
    $('body').append(html);
    html.find('#comparison__input').focus();
    html.find('#comparison').submit(() => {
      this.getAnswerTask(result);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    const inputValue = $('#comparison__input').val();
    $('.shadow').css('display', 'none');
    $('.button__start-fight').prop('disabled', false);
    if (inputValue === `${result}`) {
      ComparisonTask.deleteTask();
      BattleArena.startFight('attack', 'true', 'fireball');
    } else {
      ComparisonTask.deleteTask();
      BattleArena.startFight('attack', 'false');
    }
  }
}
