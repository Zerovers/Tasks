import css from './index.css';
import htmlPazzle from './index.html';
import pazzleList from './pazzleList.json';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

const html = $(htmlPazzle);
class pazzleTask {
  render(content) {
    const map = content;
    $('.heal-spells-list').remove();
    html.find('#input-pazzle').val('');
    html.find('.pazzle-content').html(`Отгадайте загадку:<br> ${map.rndKeys}`);
    $('body').append(html);
    html.find('#input-pazzle').focus();
    html.find('#input-pazzle').on('change', (event) => { this.getAnswerTask(content) });
  }
  deleteTask() {
    html.remove();
  }
  async getAnswerTask(content) {
    let count = 0;
    const result = content.answer;
    const pazzleAnswer = event.target.value.toLowerCase();
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
      await pause(1500);
      player.getDamage();
    }
    if (player.hp === 0) {
    }
  }
}
const pazzles = new pazzleTask();
export default pazzles;

const pause = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}