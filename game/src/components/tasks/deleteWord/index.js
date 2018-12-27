import './index.css';
import htmlDeleteWord from './index.html';
import BattleArena from '../../../screens/battle';

const html = $(htmlDeleteWord);
export default class DeleteWordTask {
  static render(data) {
    const [rndKeys, result] = [data.rndKeys, data.answer];
    $('.heal-spells-list').remove();
    html.find('#delete-word__input').val('');
    html.find('.delete-word__content__content').html(`${rndKeys}`);
    $('body').append(html);
    html.find('#delete-word__input').focus();
    html.find('#delete-word').submit(() => {
      DeleteWordTask.getAnswerTask(result);
      return false;
    });
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    const inputValue = $('#delete-word__input').val();
    $('.shadow').css('display', 'none');
    $('.button__start-fight').prop('disabled', false);
    let count = 0;
    const answer = inputValue.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (answer === result[i]) {
        count += 1;
      }
    }
    if (count > 0) {
      DeleteWordTask.deleteTask();
      BattleArena.startFight('heal', 'true');
    } else {
      DeleteWordTask.deleteTask();
      BattleArena.startFight('heal', 'false');
    }
  }
}
