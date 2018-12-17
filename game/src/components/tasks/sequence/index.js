import css from './index.css';
import htmlSequence from './index.html';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

const html = $(htmlSequence);
class sequenceTask {
  render(content) {
    $('.attack-spells-list').remove();
    html.find('#input-sequence').val('');
    html.find('.sequence-number').html(`Продолжите последовательность цифр<br> <span>${content.rndNumber}</span>
    <span>${content.rndNumber + content.rndDiff}</span>
    <span>${content.rndNumber + content.rndDiff * 2}</span> <span>?</span>`);
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
const sequences = new sequenceTask();
export default sequences;
