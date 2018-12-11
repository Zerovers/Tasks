import css from './index.css';
import htmlSpeech from './index.html';
import speechList from './speechList.json';
import { monster, player, Enemy, names } from 'index';

let voices = speechSynthesis.getVoices();
const html = $(htmlSpeech);
class speechTask {
  render(content) {
    console.log(content);
    const spellmenu = $('.context-menu');
    spellmenu.remove();
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
    // if (object.enemy.hp === 0) {
    //   createNewEnemy(object);
    // }
  }
}
const speechs = new speechTask();
export default speechs;










// function renderSpeechContent() {
//   const rnd = getRandom(0, speechList.list.length-1);
//   return speechList.list[rnd];
// }
// function speech(message) {
//   let msg = new SpeechSynthesisUtterance(message);
//   msg.pitch = 1;
//   msg.rate = 0.8;
//   voices = speechSynthesis.getVoices();
//   msg.voice = voices[3];
//   speechSynthesis.speak(msg)
// }
// export function getSpeechEvent(object) {
//   const spellSpeech = $('.spell-speech');
//   spellSpeech.on('click', (e) => {
//     if (e.target) {

//       const result = renderSpeechContent();
//       speech(result);
//       const input = $('#input-speech');
//       input.on('change', (event) => {
//         const speechAnswer = event.target.value.toLowerCase();
//         if (speechAnswer === result) {
//           healPlayer(object, input);
//         } else {
//           dmgEnemy(object, input);
//         }
//         if (object.enemy.hp === 0) {
//           createNewEnemy(object);
//         }
//       })
//     }
//   })
// }