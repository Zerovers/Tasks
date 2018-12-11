import css from './index.css';
import htmlLogic from './index.html';
import logicList from './logicList.json';
import { monster, player, Enemy, names } from 'index';

const html = $(htmlLogic);
class logicTask {
  render(content) {
    const map = content;
    const spellmenu = $('.context-menu');
    spellmenu.remove();
    html.find('#input-logic').val('');
    html.find('.logic-content').html(`Ответье на вопрос ${map.rndKeys}`);
    $('body').append(html);
    html.find('#input-logic').focus();
    html.find('#input-logic').on('change', (event) => { this.getAnswerTask(content)})
  }
  deleteTask() {
    html.remove();
  }
  getAnswerTask(content) {
    const result = content.answer;
    let count = 0;
    const translateAnswer = event.target.value.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (translateAnswer === result[i]) {
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
let logics = new logicTask();
export default logics;
