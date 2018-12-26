import htmlbattle from './index.html';
import css from './index.css';
import spellList from '../../components/modal-dialog';
import Player from '../../components/Player';
import Enemy from '../../components/Enemy';
import names from './name.json';
import background from './image/background_battleZone.png';
import tablesScore from '../score/index'


const html = $(htmlbattle);
let player;
let monster;
class BattleArena {
  render(content) {
    $('body').html('');
    $('body').append(html);
    $('body').css('background-image', `url(${background})`);
    player = new Player(content, 100, 0);
    monster = new Enemy(`${names.firstName[_.random(0, names.firstName.length - 1)]} 
    ${names.secondName[_.random(0, names.secondName.length - 1)]} 
    ${names.thirdName[_.random(0, names.thirdName.length - 1)]}`, 100);
    player.renderBody();
    monster.renderBody();
    $('.button__start-fight').on('click', async () => {
      player.removeAnimations();
      monster.removeAnimations();
      spellList.renderChoice();
      $('.shadow').css('display', 'flex')
      $('.button__start-fight').prop('disabled', true);
    });
  }
}
const battles = new BattleArena();
export default battles;
export { monster, player };
