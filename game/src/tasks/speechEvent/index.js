import {
  dmgEnemy,
  healPlayer,
  createNewEnemy,
  getRandom,
} from 'render';
import css from './index.css';
import htmlSpeech from './index.html';
import speechList from './speechList.json';

let voices = speechSynthesis.getVoices();
const html = $(htmlSpeech);
function renderSpeechContent() {
  const rnd = getRandom(0, speechList.list.length-1);
  html.find('#input-speech').val('');
  html.find('.speech-content').html('Впишите слово которое услышали');
  $('body').append(html);
  html.find('#input-speech').focus();
  return speechList.list[rnd];
}
function speech(message) {
  let msg = new SpeechSynthesisUtterance(message);
  msg.pitch = 1;
  msg.rate = 0.8;
  voices = speechSynthesis.getVoices();
  msg.voice = voices[3];
  speechSynthesis.speak(msg)
}
export function getSpeechEvent(object) {
  const spellSpeech = $('.spell-speech');
  spellSpeech.on('click', (e) => {
    if (e.target) {
      const spellmenu = $('.context-menu');
      spellmenu.remove();
      const result = renderSpeechContent();
      speech(result);
      const input = $('#input-speech');
      input.on('change', (event) => {
        const speechAnswer = event.target.value.toLowerCase();
        if (speechAnswer === result) {
          healPlayer(object, input);
        } else {
          dmgEnemy(object, input);
        }
        if (object.enemy.hp === 0) {
          createNewEnemy(object);
        }
      })
    }
  })
}