import './index.css';
import table from './index.html';
import BattleArena from '../battle';
import { MAIN_BODY } from '../../constant';
import { LoadScreenTableScore } from '../loading/tablescore';

const htmlScore = $(table);
export default class TableScore {
  static async render(data) {
    $(MAIN_BODY).append(htmlScore);
    $(MAIN_BODY).append(LoadScreenTableScore);
    htmlScore.find('#score__button__resetGame').click(() => { BattleArena.resetGame(); });
    fetch(`https://safe-scrubland-87155.herokuapp.com/?username=${data.username}&countMonster=${data.countMonster}`)
      .then(res => res.text())
      .then((result) => { const info = JSON.parse(result); return info; })
      .then((info) => {
        LoadScreenTableScore.remove();
        for (let i = 0; i < info.length; i += 1) {
          $('tr')[i + 1].childNodes[0].innerHTML = `${i + 1}`;
          $('tr')[i + 1].childNodes[1].innerHTML = `${info[i].username}`;
          $('tr')[i + 1].childNodes[2].innerHTML = `${info[i].countMonster}`;
        }
      });
  }

  static renderOnMainPage() {
    $(MAIN_BODY).append(htmlScore);
    $(MAIN_BODY).append(LoadScreenTableScore);
    htmlScore.find('#score__button__resetGame').remove();
    htmlScore.find('.score__content__close').on('click', () => { htmlScore.remove(); });
    fetch('https://safe-scrubland-87155.herokuapp.com/mainPage/?')
      .then(res => res.text())
      .then((result) => { const info = JSON.parse(result); return info; })
      .then((info) => {
        LoadScreenTableScore.remove();
        for (let i = 0; i < info.length; i += 1) {
          $('tr')[i + 1].childNodes[0].innerHTML = `${i + 1}`;
          $('tr')[i + 1].childNodes[1].innerHTML = `${info[i].username}`;
          $('tr')[i + 1].childNodes[2].innerHTML = `${info[i].countMonster}`;
        }
      });
  }
}
