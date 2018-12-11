import css from './index.css';
import htmlDeleteWord from './index.html';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

const html = $(htmlDeleteWord);
class deleteWordTask {
  render(content) {
    const map = content;
    const spellmenu = $('.context-menu');
    spellmenu.remove();
    html.find('#input-delete-word').val('');
    html.find('.delete-word-content').html(`${map.rndKeys}`);
    $('body').append(html);
    html.find('#input-delete-word').focus();
    html.find('#input-delete-word').on('change', (event) => this.getAnswerTask(content));
  }
  deleteTask() {
    html.remove();
  }
  getAnswerTask(content) {
    const result = content.answer;
    let count = 0;
    const answer = event.target.value.toLowerCase();
    for (let i = 0; i < result.length; i += 1) {
      if (answer === result[i]) {
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
let deleteWords = new deleteWordTask();
export default deleteWords;

