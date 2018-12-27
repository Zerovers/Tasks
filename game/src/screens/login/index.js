import background from './background_loginscreen.png';
import BattleArena from '../battle';
import './index.css';

$('body').css('background-image', `url("${background}"`);
$('.login__content').submit(() => {
  const name = $('#login__content__input').val();
  BattleArena.render(name);
  return false;
});
