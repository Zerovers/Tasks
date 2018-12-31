import './index.css';
import './images/background_home_header.jpg';
import './images/background_nav_header.jpg';
import './images/background_home_history.jpg';
import './images/background_screenshoot_home.jpg';
import './images/background_footer_home.jpg';
import './images/screenshoot_game1.jpg';
import './images/screenshoot_game2.jpg';
import './images/screenshoot_game3.jpg';
import './images/screenshoot_game4.jpg';
import './images/screenshoot_game5.jpg';
import './images/screenshoot_game6.jpg';
import LoginScreen from '../login';
import TableScore from '../score';

$('#landing-page__button').on('click', () => {
  LoginScreen.render();
});
$('#landing-page__button').on('mousedown', () => {
  $('#landing-page__button').css('background-color', 'rgb(73, 14, 10)');
  $('#landing-page__button').css('border-color', 'rgb(14, 39, 148)');
});
$('.landing-page__table-score').on('click', () => {
  TableScore.renderOnMainPage();
});
