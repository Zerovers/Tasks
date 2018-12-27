import './index.css';
import table from './index.html';
import { monster, player } from '../battle/index';
import names from '../battle/name.json';

const _ = require('lodash');

const htmlScore = $(table);
export default class TableScore {
  static async render(data) {
    $('body').append(htmlScore);
    htmlScore.find('#score__button').click(() => {
      htmlScore.remove();
      monster.name = `${names.firstName[_.random(0, names.firstName.length - 1)]} 
      ${names.secondName[_.random(0, names.secondName.length - 1)]} 
      ${names.thirdName[_.random(0, names.thirdName.length - 1)]}`;
      monster.newMonster = _.random(1, 3);
      monster.indicationHp();
      monster.renderBody();
      monster.hp = 100;
      player.reset();
    });
    fetch(`http:/localhost:3000/?username=${data.username}&countMonster=${data.countMonster}`)
      .then(res => res.text())
      .then((result) => { const info = JSON.parse(result); return info; })
      .then((info) => {
        for (let i = 0; i < info.length; i += 1) {
          $('tr')[i + 1].childNodes[0].innerHTML = `${i + 1}`;
          $('tr')[i + 1].childNodes[1].innerHTML = `${info[i].username}`;
          $('tr')[i + 1].childNodes[2].innerHTML = `${info[i].countMonster}`;
        }
      });
  }
}
