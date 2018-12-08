import css from './index.css';
import htmlMath from './index.html';
import mathContent from 'src/tasksContent';
import { monster, player, Enemy, names } from 'index';

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const html = $(htmlMath);
class mathTask {
  render(content) {
    const spellmenu = $('.context-menu');
    spellmenu.remove();
    html.find('#input-math').val('');
    html.find('.math-operations').html(`${content.firstNumber} ${content.outsign} ${content.secondNumber} = `);
    $('body').append(html);
    html.find('#input-math').focus();
    html.find('#input-math').on('change', (event) => this.answerMathTask(content));
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
    html.find('#input-math').closest('div').remove();
  }
  answerMathTask(content) {
    const result = this.getMathOperation(content);
    if (event.target.value === result + '') {
      monster.getDamage();
      this.deleteTask();
    } else {
      player.getDamage();
      this.deleteTask();
    }
    // if (monster.hp === 0) {
    //   const rnd = getRandom(0, names.length);
    //   let newenemy = new Enemy(names[rnd], 100);
    //   newenemy.indicationHp();
    //   player.killMonsters();
    //   console.log(newenemy.name);
    // }
  }
}

let mathEvent = new mathTask();
export default mathEvent;


