import css from './index.css';
import htmlGrammatic from './index.html';
import grammaticList from './grammaticList';
import { monster, player } from 'index';

const html = $(htmlGrammatic);
class grammaticTask {
  render() {
    const list = grammaticList.map;
    const spellmenu = $('.context-menu');
    spellmenu.remove();
    const rndList = list[_.random(0, list.length)];
    $('body').append(html);
    html.find('.grammatic-word').html(`Произнесите ${rndList}`);
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
      // if (object.enemy.hp === 0) {
      //   createNewEnemy(object);
      // }
    }
  }
}
let grammatics = new grammaticTask();
export default grammatics;
