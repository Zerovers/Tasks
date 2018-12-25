import css from './index.css';
import table from './index.html';
import pause from '../../components/utils/index';
import { monster, player } from '../battle/index';
import names from '../battle/name.json';

const htmlScore = $(table);
class tableScore {
  async render(data) {
    $('body').append(htmlScore);
    htmlScore.find('#score__button').click((e) => {
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
    let info;
    fetch(`http:/localhost:3000/?username=${data.username}&countMonster=${data.countMonster}`)
      .then(res => res.text())
      .then((result) => {
        info = JSON.parse(result);
      });
    await pause(1000);
    for (let i = 0; i < info.length; i += 1) {
      $('tr')[i + 1].childNodes[0].innerHTML = `${i + 1}`;
      $('tr')[i + 1].childNodes[1].innerHTML = `${info[i].username}`;
      $('tr')[i + 1].childNodes[2].innerHTML = `${info[i].countMonster}`;
    }
  }
}

let tablesScore = new tableScore();
export default tablesScore;
