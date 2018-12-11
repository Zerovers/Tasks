import css from './index.css';
import htmlPazzle from './index.html';
import pazzleList from './pazzleList.json';
import { monster, player, Enemy, names } from 'index';

const html = $(htmlPazzle);
class pazzleTask {
  render(content) {
    const map = content;
    const spellmenu = $('.context-menu');
    spellmenu.remove();
    html.find('#input-pazzle').val('');
    html.find('.pazzle-content').html(`Отгадайте загадку \n ${map.rndKeys}`);
    $('body').append(html);
    html.find('#input-pazzle').focus();
    html.find('#input-pazzle').on('change', (event) => { this.getAnswerTask(content) });
  }
  deleteTask() {
    html.remove();
  }
  getAnswerTask(content) {
    let count = 0;
    const result = content.answer;
    const pazzleAnswer = event.target.value.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (pazzleAnswer === result[i]) {
        count += 1;
      }
    }
    if (count > 0) {
      monster.getDamage();
      this.deleteTask();
    } else {
      player.getDamage();
      this.deleteTask();
    }
    // if (object.enemy.hp === 0) {
    //   createNewEnemy(object);
    // }
  }
}
const pazzles = new pazzleTask();
export default pazzles;
