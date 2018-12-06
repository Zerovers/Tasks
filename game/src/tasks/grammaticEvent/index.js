import {
  dmgEnemy,
  dmgPlayer,
  createNewEnemy,
  getRandom,
} from 'render';
import css from './index.css';
import htmlGrammatic from './index.html';
import grammaticList from './grammaticList.json';

const html = $(htmlGrammatic);
function renderGrammaticContent(list) {
  const rndList = list[getRandom(0, list.length)];
  $('body').append(html);
  html.find('.grammatic-word').html(`Произнесите ${rndList}`);
  return rndList; 
}
export function getGrammaticEvent(object) {
  const spellGrammatic = $('.spell-grammatic');
  spellGrammatic.on('click', (e) => {
    if (e.target) {
      const spellmenu = $('.context-menu');
      spellmenu.remove();
      console.log(grammaticList.list);    
      let word = renderGrammaticContent(grammaticList.list);
      let recognizer = new webkitSpeechRecognition();
      recognizer.interimResults = false;
      recognizer.maxAlternatives = 1;
      recognizer.lang = 'en-US';
      recognizer.start();
      recognizer.onresult = (event) => {
        const input = $('.grammatic-word');
        let result = event.results[0][0].transcript;
        if (word === result) {
          dmgEnemy(object, input);
        } else {
          dmgPlayer(object, input);
        }
        if (object.enemy.hp === 0) {
          createNewEnemy(object);
        }
      }
    }
  })
}
