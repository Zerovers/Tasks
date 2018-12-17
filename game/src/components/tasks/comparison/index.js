import css from './index.css';
import htmlCompasion from './index.html';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

const html = $(htmlCompasion)
class comparisonTask {
  render(content) {
    $('.attack-spells-list').remove();
    html.find('#input-comparison').val('');
    html.find('.comparison-operations').html(`${content.firstNumber} <span style="color: red">?</span> ${content.secondNumber}`);
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
    if (monster.hp === 0) {
      monster.name = `${names.firstName[_.random(0,names.firstName.length - 1)]} 
      ${names.secondName[_.random(0,names.secondName.length - 1)]} 
      ${names.thirdName[_.random(0,names.thirdName.length - 1)]}`;
      console.log(monster.name);
      monster.hp = 100;
      monster.indicationHp();
      monster.renderBody();
      player.killMonsters();
    }
  }
}
const comparisons = new comparisonTask();
export default comparisons;
