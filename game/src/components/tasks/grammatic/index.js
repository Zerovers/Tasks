import css from './index.css';
import htmlGrammatic from './index.html';
import grammaticList from './grammaticList';
import { player, monster } from '../../../screens/battle';
import pause from '../../utils/index';
import tablesScore from '../../../screens/score/index';

const html = $(htmlGrammatic);
class grammaticTask {
  render() {
    const list = grammaticList.map;
    $('.heal-spells-list').remove();
    const rndList = list[_.random(0, list.length)];
    $('body').append(html);
    html.find('.grammatic__content__word').html(`Произнесите <span>${rndList}</span>`);
    html.find('#grammatic__button').on('click', () => { this.getAnswerTask(rndList); $('.shadow').css('display', 'none'); $('.button__start-fight').prop('disabled', false); });
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
    recognizer.onresult = async (event) => {
      let result = event.results[0][0].transcript;
      if (word === result) {
        this.deleteTask();
        player.addAnimationHealing();
        await pause(1000);
        player.getHeal();    
      } else {
        this.deleteTask();
        monster.addAnimationAttack();
        await pause(1500);
        player.getDamage();
      }
      if (player.hp <= 0) {
        let username = player.name;
        let countMonster = player.countMonsters;
        const data = { username, countMonster };
        tablesScore.render(data);
      }
    }
  }
}
let grammatics = new grammaticTask();
export default grammatics;
