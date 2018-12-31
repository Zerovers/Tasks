import './index.css';
import htmlbattle from './index.html';
import SpellFactory from '../../components/modal-dialog';
import Player from '../../components/Player';
import Enemy from '../../components/Enemy';
import names from '../../components/Enemy/name.json';
import background from './image/background_battleZone.jpg';
import pause from '../../utility/pause';
import TableScore from '../score';
import { LOADING_GAME_SCREEN } from '../loading/game';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  TABLE_SCORE,
} from '../../constant';

const _ = require('lodash');

let player;
let monster;
const html = $(htmlbattle);
export default class BattleArena {
  static render(data) {
    $(MAIN_BODY).html('');
    $(MAIN_BODY).append(html);
    $(MAIN_BODY).css('background-image', `url(${background})`);
    $(MAIN_BODY).append(LOADING_GAME_SCREEN);
    player = new Player(data, 100, 0);
    monster = new Enemy(`${names.firstName[_.random(0, names.firstName.length - 1)]} 
    ${names.secondName[_.random(0, names.secondName.length - 1)]} 
    ${names.thirdName[_.random(0, names.thirdName.length - 1)]}`, 100);
    Player.renderBody();
    monster.renderBody();
    $(document).ready(() => { $('.loading-game').remove(); });
    $(BUTTON_START_FIGHT).on('click', async () => { BattleArena.startFight(); });
  }

  static startFight() {
    Player.removeAnimations();
    Enemy.removeAnimations();
    SpellFactory.renderChoice();
    $(SHADOW_FRAME).css('display', 'flex');
    $(BUTTON_START_FIGHT).prop('disabled', true);
  }

  static async startBattle(action, result, spellName) {
    switch (action) {
      case 'attack':
        switch (result) {
          case 'true':
            Player.addAnimationAttack(spellName);
            await pause(1500);
            monster.getDamage();
            if (monster.hp === 0) {
              await pause(1000);
              monster.resetParametrs();
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

  static resetGame() {
    $(TABLE_SCORE).remove();
    monster.name = `${names.firstName[_.random(0, names.firstName.length - 1)]} 
    ${names.secondName[_.random(0, names.secondName.length - 1)]} 
    ${names.thirdName[_.random(0, names.thirdName.length - 1)]}`;
    monster.newMonster = _.random(1, 3);
    monster.indicationHp();
    monster.renderBody();
    monster.hp = 100;
    player.reset();
  }
}
