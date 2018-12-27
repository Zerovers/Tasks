import './index.css';
import htmlGrammatic from './index.html';
import grammaticList from './grammaticList';
import BattleArena from '../../../screens/battle';

const _ = require('lodash');

const html = $(htmlGrammatic);
export default class GrammaticTask {
  static render() {
    const list = grammaticList.map;
    $('.heal-spells-list').remove();
    const rndList = list[_.random(0, list.length)];
    $('body').append(html);
    html.find('.grammatic__content__word').html(`Произнесите <span>${rndList}</span>`);
    html.find('#grammatic__button').on('click', () => { GrammaticTask.getAnswerTask(rndList); });
  }

  static deleteTask() {
    html.remove();
  }

  static getAnswerTask(data) {
    $('.shadow').css('display', 'none');
    $('.button__start-fight').prop('disabled', false);
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
        BattleArena.startFight('heal', 'true');
      } else {
        GrammaticTask.deleteTask();
        BattleArena.startFight('heal', 'false');
      }
    };
  }
}
