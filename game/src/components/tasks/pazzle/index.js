import './index.css';
import htmlPazzle from './index.html';
import BattleArena from '../../../screens/battle';

const html = $(htmlPazzle);
export default class PazzleTask {
  static render(data) {
    const [rndKeys, result] = [data.rndKeys, data.answer];
    $('.heal-spells-list').remove();
    html.find('#pazzle__input').val('');
    html.find('.pazzle__content__text').html(`Отгадайте загадку:<br> ${rndKeys}`);
    $('body').append(html);
    html.find('#pazzle__input').focus();
    html.find('#pazzle').submit(() => {
      PazzleTask.getAnswerTask(result);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    let count = 0;
    const inputValue = $('#pazzle__input').val();
    $('.shadow').css('display', 'none');
    $('.button__start-fight').prop('disabled', false);
    const pazzleAnswer = inputValue.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (pazzleAnswer === result[i]) {
        count += 1;
      }
    }
    if (count > 0) {
      PazzleTask.deleteTask();
      BattleArena.startFight('heal', 'true');
    } else {
      PazzleTask.deleteTask();
      BattleArena.startFight('heal', 'false');
    }
  }
}
