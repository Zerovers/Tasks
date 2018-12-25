import css from './index.css';
import htmlLogic from './index.html';
import { player, monster } from '../../../screens/battle';
import pause from '../../utils/index';
import tablesScore from '../../../screens/score/index';

let inputValue;
const html = $(htmlLogic);
class logicTask {
  render(content) {
    const map = content;
    $('.heal-spells-list').remove();
    html.find('#logic__input').val('');
    html.find('.logic__content__text').html(`Ответье на вопрос:<br> ${map.rndKeys}`);
    $('body').append(html);
    html.find('#logic__input').focus();
    html.find('#logic').submit(() => {
      inputValue = $('#logic__input').val();
      this.getAnswerTask(content);
      $('.shadow').css('display', 'none');
      $('.button__start-fight').prop('disabled', false);
      return false;
    })
  }
  deleteTask() {
    html.remove();
  }
  async getAnswerTask(content) {
    const result = content.answer;
    let count = 0;
    const translateAnswer = inputValue.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (translateAnswer === result[i]+'') {
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
    if (player.hp <= 0) {
      let username = player.name;
      let countMonster = player.countMonsters;
      const data = { username, countMonster };
      tablesScore.render(data);
    }
  }
}
let logics = new logicTask();
export default logics;
