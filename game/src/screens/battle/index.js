import htmlbattle from './index.html';
import SpellFactory from '../../components/modal-dialog';
import Player from '../../components/Player';
import Enemy from '../../components/Enemy';
import names from './name.json';
import background from './image/background_battleZone.png';
import pause from '../../components/utils';
import TableScore from '../score';
import './index.css';

const _ = require('lodash');

let player;
let monster;
const html = $(htmlbattle);
export default class BattleArena {
  static render(content) {
    $('body').html('');
    $('body').append(html);
    $('body').css('background-image', `url(${background})`);
    player = new Player(content, 100, 0);
    monster = new Enemy(`${names.firstName[_.random(0, names.firstName.length - 1)]} 
    ${names.secondName[_.random(0, names.secondName.length - 1)]} 
    ${names.thirdName[_.random(0, names.thirdName.length - 1)]}`, 100);
    Player.renderBody();
    monster.renderBody();
    $('.button__start-fight').on('click', async () => { BattleArena.takeAction(); });
  }

  static takeAction() {
    Player.removeAnimations();
    Enemy.removeAnimations();
    SpellFactory.renderChoice();
    $('.shadow').css('display', 'flex');
    $('.button__start-fight').prop('disabled', true);
  }

  static async startFight(action, result, spellName) {
    switch (action) {
      case 'attack':
        switch (result) {
          case 'true':
            Player.addAnimationAttack(spellName);
            await pause(1500);
            monster.getDamage();
            if (monster.hp === 0) {
              monster.name = `${names.firstName[_.random(0, names.firstName.length - 1)]} 
            ${names.secondName[_.random(0, names.secondName.length - 1)]} 
            ${names.thirdName[_.random(0, names.thirdName.length - 1)]}`;
              await pause(1000);
              monster.hp = 100;
              monster.newMonster = _.random(1, 3);
              monster.indicationHp();
              monster.renderBody();
              player.killMonsters();
              player.getDmg += 5;
            }
            break;
          case 'false':
            monster.addAnimationAttack();
            await pause(1000);
            player.getDamage();
            if (player.hp <= 0) {
              const username = player.name;
              const countMonster = player.countMonsters;
              const data = { username, countMonster };
              TableScore.render(data);
            }
            break;
          default:
        }
        break;
      case 'heal':
        switch (result) {
          case 'true':
            Player.addAnimationHealing();
            await pause(1000);
            player.getHeal();
            break;
          case 'false':
            monster.addAnimationAttack();
            await pause(1000);
            player.getDamage();
            if (player.hp <= 0) {
              const username = player.name;
              const countMonster = player.countMonsters;
              const data = { username, countMonster };
              TableScore.render(data);
            }
            break;
          default:
        }
        break;
      default:
    }
  }
}
export { player, monster };
