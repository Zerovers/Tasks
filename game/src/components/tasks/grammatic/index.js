import css from './index.css';
import htmlGrammatic from './index.html';
import grammaticList from './grammaticList';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

const html = $(htmlGrammatic);
class grammaticTask {
  render() {
    const list = grammaticList.map;
    $('.attack-spells-list').remove();
    const rndList = list[_.random(0, list.length)];
    $('body').append(html);
    html.find('.grammatic-word').html(`Произнесите <span>${rndList}</span>`);
    html.find('#grammatic-button').on('click', (e) => this.getAnswerTask(rndList));
  }
  deleteTask() {
    html.remove();
  }
  getAnswerTask(content) {
    let word = content;
    let recognizer = new webkitSpeechRecognition();
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;
    recognizer.lang = 'en-US';
    recognizer.start();
    recognizer.onresult = (event) => {
      let result = event.results[0][0].transcript;
      if (word === result) {
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
}
let grammatics = new grammaticTask();
export default grammatics;
