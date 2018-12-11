import css from './index.css';
import htmlMath from './index.html';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

const html = $(htmlMath);
class mathTask {
  render(content) {
    const spellmenu = $('.context-menu');
    spellmenu.remove();
    html.find('#input-math').val('');
    html.find('.math-operations').html(`${content.firstNumber} ${content.outsign} ${content.secondNumber} = `);
    $('body').append(html);
    html.find('#input-math').focus();
    html.find('#input-math').on('change', (event) => this.getAnswerTask(content));
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
  getAnswerTask(content) {
    const result = this.getMathOperation(content);
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
      player.killMonsters();
    }
  }
}
let mathematics = new mathTask();
export default mathematics;


