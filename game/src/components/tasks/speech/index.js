import './index.css';
import htmlSpeech from './index.html';
import BattleArena from '../../../screens/battle';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  HEAL_SPELL_LIST,
} from '../../../constant';

let voices = speechSynthesis.getVoices();
const html = $(htmlSpeech);
const SPEECH_INPUT = '#speech__input';
export default class SpeechTask {
  static render(data) {
    $(HEAL_SPELL_LIST).remove();
    $(MAIN_BODY).append(html);
    html.find(SPEECH_INPUT).val('').focus();
    html.find('.speech-content__text').html('Впишите слово которое услышали');
    this.setSpeech(data);
    html.find('#speech__button').on('click', () => { SpeechTask.setSpeech(data); });
    html.find(SPEECH_INPUT).on('change', () => { SpeechTask.getAnswerTask(data); });
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
    $(SHADOW_FRAME).css('display', 'none');
    $(BUTTON_START_FIGHT).prop('disabled', false);
    const inputValue = $(SPEECH_INPUT).val();
    const speechAnswer = inputValue.toLowerCase();
    if (speechAnswer === result) {
      SpeechTask.deleteTask();
      BattleArena.startBattle('heal', 'true');
    } else {
      SpeechTask.deleteTask();
      BattleArena.startBattle('heal', 'false');
    }
  }
}
