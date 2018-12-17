import css from './index.css';
import icon from './icon.min.css';
import htmlSpeech from './index.html';
import speechList from './speechList.json';
import { player, monster } from '../../../screens/battle';
import names from '../../../screens/battle/name.json';

let voices = speechSynthesis.getVoices();
const html = $(htmlSpeech);
class speechTask {
  render(content) {
    $('.heal-spells-list').remove();
    html.find('#input-speech').val('');
    html.find('.speech-content').html('Впишите слово которое услышали');
    this.setSpeech(content);
    $('body').append(html);
    html.find('#input-speech').focus();
    html.find('#speech-button').on('click', (event) => { this.setSpeech(content) });
    html.find('#input-speech').on('change', (event) => { this.getAnswerTask(content) });
  }
  setSpeech(content) {
    const message = content;
    let msg = new SpeechSynthesisUtterance(message);
    msg.pitch = 1;
    msg.rate = 0.8;
    voices = speechSynthesis.getVoices();
    msg.voice = voices[3];
    speechSynthesis.speak(msg)
  }
  deleteTask() {
    html.remove();
  }
  getAnswerTask(content) {
    const result = content;
    const speechAnswer = event.target.value.toLowerCase();
    if (speechAnswer === result) {
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
const speechs = new speechTask();
export default speechs;
