import './index.css';
import htmlSpeech from './index.html';
import BattleArena from '../../../screens/battle';

let voices = speechSynthesis.getVoices();
const html = $(htmlSpeech);
export default class SpeechTask {
  static render(data) {
    $('.heal-spells-list').remove();
    html.find('#speech__input').val('');
    html.find('.speech__content__text').html('Впишите слово которое услышали');
    this.setSpeech(data);
    $('body').append(html);
    html.find('#speech__input').focus();
    html.find('#speech__button').on('click', () => { SpeechTask.setSpeech(data); });
    html.find('#speech__input').on('change', () => { SpeechTask.getAnswerTask(data); });
  }

  static setSpeech(data) {
    const message = data;
    const msg = new SpeechSynthesisUtterance(message);
    msg.pitch = 1;
    msg.rate = 0.8;
    voices = speechSynthesis.getVoices();
    const [usingVoice] = [voices[3]];
    msg.voice = usingVoice;
    speechSynthesis.speak(msg);
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    $('.shadow').css('display', 'none');
    $('.button__start-fight').prop('disabled', false);
    const inputValue = $('#speech__input').val();
    const speechAnswer = inputValue.toLowerCase();
    if (speechAnswer === result) {
      SpeechTask.deleteTask();
      BattleArena.startFight('heal', 'true');
    } else {
      SpeechTask.deleteTask();
      BattleArena.startFight('heal', 'false');
    }
  }
}
