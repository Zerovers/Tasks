import css from './index.css';
import htmlCompasion from './index.html';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';
import pause from '../../utils/index';

let inputValue;
const html = $(htmlCompasion)
class comparisonTask {
  render(content) {
    $('.attack-spells-list').remove();
    html.find('#comparison__input').val('');
    html.find('.comparison__content__operations').html(`${content.firstNumber} <span style="color: red">?</span> ${content.secondNumber}`);
    $('body').append(html);
    html.find('#comparison__input').focus();
    html.find('#comparison').submit(() => { 
      inputValue = $('#comparison__input').val();
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
    const result = content.sign
    if (inputValue === result + '') {
      this.deleteTask();
      player.addAnimationAttack('fireball');
      await pause(1500);
      monster.getDamage();
    } else {
      this.deleteTask();
      monster.addAnimationAttack();
      await pause(1000);
      player.getDamage();    
    }
    if (monster.hp === 0) {
      monster.name = `${names.firstName[_.random(0,names.firstName.length - 1)]} 
      ${names.secondName[_.random(0,names.secondName.length - 1)]} 
      ${names.thirdName[_.random(0,names.thirdName.length - 1)]}`;
      await pause(1000);
      monster.hp = 100;
      monster.newMonster = _.random(1,3);
      monster.indicationHp();
      monster.renderBody();
      player.killMonsters();
      player.damage = player.damage + 5;
    }
  }
}
const comparisons = new comparisonTask();
export default comparisons;
