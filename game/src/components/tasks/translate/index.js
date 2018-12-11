import css from './index.css';
import htmlTranslate from './index.html';
import translateList from './translateList.json';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

const html = $(htmlTranslate);
class translateTask {
  render(content) {
    let map = content;
    const spellmenu = $('.context-menu');
    spellmenu.remove();
    html.find('#input-translate').val('');
    html.find('.translate-word').html(`Переведите ${map.rndKeys}`);
    $('body').append(html);
    html.find('#input-translate').focus();
    html.find('#input-translate').on('change', (event) => { this.getAsnwerTask(content) });
  }
  deleteTask() {
    html.remove();
  }
  getAsnwerTask(content) {
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
      player.killMonsters();
    }
  }
}
let translates = new translateTask();
export default translates;
