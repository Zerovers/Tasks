import './index.css';
import htmlLogic from './index.html';
import BattleArena from '../../../screens/battle';

const html = $(htmlLogic);
export default class LogicTask {
  static render(data) {
    const [rndKeys, result] = [data.rndKeys, data.answer];
    $('.heal-spells-list').remove();
    html.find('#logic__input').val('');
    html.find('.logic__content__text').html(`Ответье на вопрос:<br> ${rndKeys}`);
    $('body').append(html);
    html.find('#logic__input').focus();
    html.find('#logic').submit(() => {
      LogicTask.getAnswerTask(result);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    const inputValue = $('#logic__input').val();
    $('.shadow').css('display', 'none');
    $('.button__start-fight').prop('disabled', false);
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
