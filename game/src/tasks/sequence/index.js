import css from './index.css';
import htmlSequence from './index.html';
import { monster, player, Enemy, names } from 'index';

const html = $(htmlSequence);
class sequenceTask {
  render(content) {
    const spellmenu = $('.context-menu');
    spellmenu.remove();
    html.find('#input-sequence').val('');
    html.find('.sequence-number').html(`Продолжите последовательность цифр\n ${content.rndNumber} ${content.rndNumber + content.rndDiff} ${content.rndNumber + content.rndDiff * 2} ?`);
    $('body').append(html);
    html.find('#input-sequence').focus();
    html.find('#input-sequence').on('change', (event) => { this.getAnswerTask(content) });
  }
  deleteTask() {
    html.remove();
  }
  getAnswerTask(content) {
    const result = content;
    if (event.target.value === result.rndNumber + result.rndDiff*3 + '') {
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
const sequences = new sequenceTask();
export default sequences;
