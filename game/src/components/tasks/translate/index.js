import css from './index.css';
import htmlTranslate from './index.html';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';
import pause from '../../utils/index';

let inputValue;
const html = $(htmlTranslate);
class translateTask {
  render(content) {
    let map = content;
    $('.attack-spells-list').remove();
    html.find('#translate__input').val('');
    html.find('.translate__content__word').html(`Переведите <span>${map.rndKeys}</span>`);
    $('body').append(html);
    html.find('#translate__input').focus();
    html.find('#translate').submit(() => { 
      inputValue = $('#translate__input').val();
      this.getAsnwerTask(content);
      $('.shadow').css('display', 'none');
      $('.button__start-fight').prop('disabled', false);
      return false;
    });
  }
  deleteTask() {
    html.remove();
  }
  async getAsnwerTask(content) {
    const result = content.answer;
    let count = 0;
    const translateAnswer = inputValue.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (translateAnswer === result[i]) {
        count += 1;
      }
    }
    if (count > 0) {
      this.deleteTask();
      player.addAnimationAttack('shadowbolt');
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
let translates = new translateTask();
export default translates;
