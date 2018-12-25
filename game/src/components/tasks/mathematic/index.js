import css from './index.css';
import htmlMath from './index.html';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';
import pause from '../../utils/index';
import tablesScore from '../../../screens/score/index';

let inputValue;
const html = $(htmlMath);
class mathTask {
  render(content) {
    $('.attack-spells-list').remove();
    html.find('#math__input').val('');
    html.find('.math__operations').html(`${content.firstNumber} ${content.outsign} ${content.secondNumber} = <span>?</span>`);
    $('body').append(html);
    html.find('#math__input').focus();
    html.find('#form__math').submit(() => {
      inputValue = $('#math__input').val();
      this.getAnswerTask(content);
      $('.shadow').css('display', 'none');
      $('.button__start-fight').prop('disabled', false);
      return false;
    });
  }
  getMathOperation(content) {
    let operation = content.outsign;
    let result = 0;
    switch (operation) {
      case '-':
        result = content.firstNumber - content.secondNumber;
        break;
      case '+':
        result = content.firstNumber + content.secondNumber;
        break;
      case '*':
        result = content.firstNumber * content.secondNumber;
        break;
      case '/':
        result = Math.round((content.firstNumber / content.secondNumber) * 10) / 10;
        break;
    }
    return result;
  }
  deleteTask() {
    html.remove();
  }
  async getAnswerTask(content) {
    const result = this.getMathOperation(content);
    if (inputValue === result + '') {
      this.deleteTask();
      player.addAnimationAttack('frostbolt');
      await pause(1500);
      monster.getDamage();
    } else {
      this.deleteTask();
      monster.addAnimationAttack();
      await pause(1000);
      player.getDamage();
    }
    if (player.hp <= 0) {
      let username = player.name;
      let countMonster = player.countMonsters;
      const data = { username, countMonster };
      tablesScore.render(data);
    }
    if (monster.hp === 0) {
      monster.name = `${names.firstName[_.random(0, names.firstName.length - 1)]} 
      ${names.secondName[_.random(0, names.secondName.length - 1)]} 
      ${names.thirdName[_.random(0, names.thirdName.length - 1)]}`;
      await pause(1000);
      monster.hp = 100;
      monster.newMonster = _.random(1, 3);
      monster.indicationHp();
      monster.renderBody();
      player.killMonsters();
      player.getDmg = player.getDmg + 5;
    }  
  }
}
let mathematics = new mathTask();
export default mathematics;
