import css from './index.css';
import htmlLogic from './index.html';
import logicList from './logicList.json';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

const html = $(htmlLogic);
class logicTask {
  render(content) {
    const map = content;
    $('.heal-spells-list').remove();
    html.find('#input-logic').val('');
    html.find('.logic-content').html(`Ответье на вопрос:<br> ${map.rndKeys}`);
    $('body').append(html);
    html.find('#input-logic').focus();
    html.find('#input-logic').on('change', (event) => { this.getAnswerTask(content)})
  }
  deleteTask() {
    html.remove();
  }
  getAnswerTask(content) {
    const result = content.answer;
    let count = 0;
    const translateAnswer = event.target.value.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (translateAnswer === result[i]) {
        count += 1;
      }
    }
    if (count > 0) {
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
let logics = new logicTask();
export default logics;
