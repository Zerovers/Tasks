import css from './index.css';
import htmlPazzle from './index.html';
import { player, monster } from '../../../screens/battle';
import pause from '../../utils/index';

let eventValue;
const html = $(htmlPazzle);
class pazzleTask {
  render(content) {
    const map = content;
    $('.heal-spells-list').remove();
    html.find('#pazzle__input').val('');
    html.find('.pazzle__content__text').html(`Отгадайте загадку:<br> ${map.rndKeys}`);
    $('body').append(html);
    html.find('#pazzle__input').focus();
    html.find('#pazzle').submit(() => {
      eventValue = $('#pazzle__input').val();
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
    let count = 0;
    const result = content.answer;
    const pazzleAnswer = eventValue.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (pazzleAnswer === result[i]) {
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
const pazzles = new pazzleTask();
export default pazzles;
