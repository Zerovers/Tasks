import css from './index.css';
import htmlCompasion from './index.html';
import { player, monster } from 'index'

const html = $(htmlCompasion)

class comparisonTask {
  render(content) {
    const spellmenu = $('.context-menu');
    spellmenu.remove();
    html.find('#input-comparison').val('');
    html.find('.comparison-operations').html(`${content.firstNumber} ? ${content.secondNumber}`);
    $('body').append(html);
    html.find('#input-comparison').focus();
    html.find('#input-comparison').on('change', (event) => this.getAnswerTask(content));
  }
  deleteTask() {
    html.remove();
  }
  getAnswerTask(content) {
    const result = content.sign
    if (event.target.value === result + '') {
      monster.getDamage();
      this.deleteTask();
    } else {
      player.getDamage();
      this.deleteTask();
    }
    // if (object.enemy.hp === 0) {
    // createNewEnemy(object);
    // }
  }
}
const comparisons = new comparisonTask();
export default comparisons;
