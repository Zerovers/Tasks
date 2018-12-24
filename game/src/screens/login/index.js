import background from './background_loginscreen.png'
import battles from '../battle';
import css from './index.css';

$('body').css('background-image', `url("${background}"`);
$('.login__content').submit(() => {
  const name = $('#login__content__input').val();
  battles.render(name);
  return false;
})
