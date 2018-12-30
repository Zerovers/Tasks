import './index.css';
import './images/background_header_home.jpg';
import './images/background_header_nav.jpg';
import LoginScreen from '../login';

$('.home').on('click', () => {
  LoginScreen.render();
});
