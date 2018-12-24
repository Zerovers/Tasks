import css from './index.css';
import htmlDeleteWord from './index.html';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';
import pause from '../../utils/index';

let inputValue;
const html = $(htmlDeleteWord);
class deleteWordTask {
  render(content) {
    const map = content;
    $('.heal-spells-list').remove();
    html.find('#delete-word__input').val('');
    html.find('.delete-word__content__content').html(`${map.rndKeys}`);
    $('body').append(html);
    html.find('#delete-word__input').focus();
    html.find('#delete-word').submit(() => {
      inputValue = $('#delete-word__input').val();
      this.getAnswerTask(content);
      $('.shadow').css('display', 'none');
      $('.button__start-fight').prop('disabled', false);
      return false;
    });
  }
  deleteTask() {
    html.remove();
  }
  async getAnswerTask(content) {
    const result = content.answer;
    let count = 0;
    const answer = inputValue.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (answer === result[i]) {
        count += 1;
      }
    }
    if (count > 0) {
      this.deleteTask();
      player.addAnimationHealing();
      await pause(1000);
      player.getHeal();    
    } else {
      this.deleteTask();
      monster.addAnimationAttack();
      await pause(1000);
      player.getDamage();
    }
    if (player.hp === 0) {
    }
  }
}
let deleteWords = new deleteWordTask();
export default deleteWords;

