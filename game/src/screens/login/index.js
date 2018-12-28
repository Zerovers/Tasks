import './index.css';
import background from './background_loginscreen.png';
import BattleArena from '../battle';

$('body').css('background-image', `url("${background}"`);
$('.login__content').submit(() => {
  const name = $('#login__content__input').val();
  BattleArena.render(name);
  return false;
});
