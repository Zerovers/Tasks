import './index.css';
import htmlGrammatic from './index.html';
import grammaticList from './grammaticList';
import BattleArena from '../../../screens/battle';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  HEAL_SPELL_LIST,
} from '../../../constant';

const _ = require('lodash');

const html = $(htmlGrammatic);
export default class GrammaticTask {
  static render() {
    const list = grammaticList.map;
    $(HEAL_SPELL_LIST).remove();
    $(MAIN_BODY).append(html);
    const rndList = list[_.random(0, list.length)];
    html.find('.grammatic-content__text').html(`Произнесите <span>${rndList}</span>`);
    html.find('#grammatic__button').on('click', () => { GrammaticTask.getAnswerTask(rndList); });
  }

  static deleteTask() {
    html.remove();
  }

  static getAnswerTask(data) {
    $(SHADOW_FRAME).css('display', 'none');
    $(BUTTON_START_FIGHT).prop('disabled', false);
    const word = data;
    const recognizer = new webkitSpeechRecognition(); // eslint-disable-line new-cap, no-undef
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;
    recognizer.lang = 'en-US';
    recognizer.start();
    recognizer.onresult = async (event) => {
      const result = event.results[0][0].transcript;
      if (word === result) {
        GrammaticTask.deleteTask();
        BattleArena.startBattle('heal', 'true');
      } else {
        GrammaticTask.deleteTask();
        BattleArena.startBattle('heal', 'false');
      }
    };
  }
}
