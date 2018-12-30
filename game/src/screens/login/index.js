import './index.css';
import htmlLogin from './index.html';
import BattleArena from '../battle';
import { MAIN_BODY } from '../../constant';
import background from './background_loginscreen.png';

const htmlTest = $(htmlLogin);
export default class LoginScreen {
  static render() {
    $(MAIN_BODY)
      .html('')
      .css('background-image', `url("${background}"`)
      .append(htmlTest);
    $('.login__content').on('submit', () => {
      const name = $('#login__content__input').val();
      BattleArena.render(name);
      return false;
    });
  }
}
