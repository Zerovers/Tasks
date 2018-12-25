import css from './index.css';
import htmlSpeech from './index.html';
import { player, monster } from '../../../screens/battle';
import pause from '../../utils/index';
import tablesScore from '../../../screens/score/index';

let voices = speechSynthesis.getVoices();
const html = $(htmlSpeech);
class speechTask {
  render(content) {
    $('.heal-spells-list').remove();
    html.find('#speech__input').val('');
    html.find('.speech__content__text').html('Впишите слово которое услышали');
    this.setSpeech(content);
    $('body').append(html);
    html.find('#speech__input').focus();
    html.find('#speech__button').on('click', (event) => { this.setSpeech(content) });
    html.find('#speech__input').on('change', (event) => { this.getAnswerTask(content); $('.shadow').css('display', 'none'); $('.button__start-fight').prop('disabled', false); });
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
  async getAnswerTask(content) {
    const result = content;
    const speechAnswer = event.target.value.toLowerCase();
    if (speechAnswer === result) {
      this.deleteTask();
      player.addAnimationHealing();
      await pause(1000);
      player.getHeal();    
    } else {
      this.deleteTask();
      monster.addAnimationAttack();
      await pause(1000);
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
const speechs = new speechTask();
export default speechs;
