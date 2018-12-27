import './index.css';
import htmlTranslate from './index.html';
import BattleArena from '../../../screens/battle';

const html = $(htmlTranslate);
export default class TranslateTask {
  static render(data) {
    const [rndKeys, result] = [data.rndKeys, data.answer];
    $('.attack-spells-list').remove();
    html.find('#translate__input').val('');
    html.find('.translate__content__word').html(`Переведите <span>${rndKeys}</span>`);
    $('body').append(html);
    html.find('#translate__input').focus();
    html.find('#translate').submit(() => {
      TranslateTask.getAsnwerTask(result);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAsnwerTask(result) {
    const inputValue = $('#translate__input').val();
    $('.shadow').css('display', 'none');
    $('.button__start-fight').prop('disabled', false);
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
