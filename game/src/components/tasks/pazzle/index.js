import css from './index.css';
import htmlPazzle from './index.html';
import pazzleList from './pazzleList.json';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

const html = $(htmlPazzle);
class pazzleTask {
  render(content) {
    const map = content;
    $('.heal-spells-list').remove();
    html.find('#input-pazzle').val('');
    html.find('.pazzle-content').html(`Отгадайте загадку:<br> ${map.rndKeys}`);
    $('body').append(html);
    html.find('#input-pazzle').focus();
    html.find('#input-pazzle').on('change', (event) => { this.getAnswerTask(content) });
  }
  deleteTask() {
    html.remove();
  }
  getAnswerTask(content) {
    let count = 0;
    const result = content.answer;
    const pazzleAnswer = event.target.value.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (pazzleAnswer === result[i]) {
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
const pazzles = new pazzleTask();
export default pazzles;
