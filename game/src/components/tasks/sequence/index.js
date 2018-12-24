import css from './index.css';
import htmlSequence from './index.html';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';
import pause from '../../utils/index';

let inputValue;
const html = $(htmlSequence);
class sequenceTask {
  render(content) {
    $('.attack-spells-list').remove();
    html.find('#sequence__input').val('');
    html.find('.sequence__content__number').html(`Продолжите последовательность цифр<br> <span>${content.rndNumber}</span>
    <span>${content.rndNumber + content.rndDiff}</span>
    <span>${content.rndNumber + content.rndDiff * 2}</span> <span>?</span>`);
    $('body').append(html);
    html.find('#sequence__input').focus();
    html.find('#sequence').submit(() => {
      inputValue = $('#sequence__input').val(); 
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
    const result = content;
    if (inputValue === result.rndNumber + result.rndDiff*3 + '') {
      this.deleteTask();
      player.addAnimationAttack('arcanemissile');
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
const sequences = new sequenceTask();
export default sequences;
