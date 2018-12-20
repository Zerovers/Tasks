import htmlbattle from './index.html';
import css from './index.css';
import spellList from '../../components/modal-dialog';
import Player from '../../components/Player';
import Enemy from '../../components/Enemy';
import names from './name.json';

const html = $(htmlbattle);
let player;
let monster;
class battleArena {
  render(content) {
    $('body').html('');
    $('body').append(html);
    player = new Player(content, 100, 0);
    monster = new Enemy(`${names.firstName[_.random(0,names.firstName.length - 1)]} 
    ${names.secondName[_.random(0,names.secondName.length - 1)]} 
    ${names.thirdName[_.random(0,names.thirdName.length - 1)]}`, 100);
    player.renderBody();
    monster.renderBody();
    $('.button').on('click', async () => {
      player.removeAnimations();
      monster.removeAnimationTakeDamage();
      spellList.renderChoice();
    });
  }
}
const battles = new battleArena();
export default battles;
export { monster, player };

const pause = (time) => {
  return new Promise((resolve) => {
    console.log('wow');
    setTimeout(() => {
      resolve();
    }, time);
  });
}
