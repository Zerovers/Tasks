import './index.css';
import React from 'react';
import { withRouter } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import TableScore from '../score/index';

import './images/background_home_header.jpg';
import './images/background_footer_home.jpg';
import './images/background_home_history.jpg';
import './images/background_nav_header.jpg';
import './images/background_screenshoot_home.jpg';
import './images/screenshoot_game1.jpg';
import './images/screenshoot_game2.jpg';
import './images/screenshoot_game3.jpg';
import './images/screenshoot_game4.jpg';
import './images/screenshoot_game5.jpg';
import './images/screenshoot_game6.jpg';


class HomeScreen extends React.Component {
  state = {
    tableScore: false,
  }

  closeTableScore = () => {
    this.setState({ tableScore: false })
  }

  render() {
    let tableScore = null;
    if (this.state.tableScore === true) {
      tableScore = <TableScore closeTableScore={this.closeTableScore}/>
    }
    return(
      <>
      {tableScore}
      <div className='landing-page' id='Game'>
          <header>
            <div className='header__nav'>
              <nav>
                <ul>
                  <Link to="/#Game">Играть</Link>
                  <Link to="/#History">История</Link>
                  <Link to="/#Screenshoots">Скриншоты</Link>
                  <Link to="/#Contact">Контакты</Link>
                  <li className='landing-page__table-score' onClick={ () => {
                    this.setState({ tableScore: true });
                  }
                  }>Рекорды</li>
                </ul>
              </nav>
            </div>
            <div className='header__content'>
              <h1>Битва за Торезан</h1>
              <Link to='/login'><button id='landing-page__button'>Играть</button></Link>
            </div>
          </header>
          <div className='landing-page__history' id='History'>
            <div className='landing-page__history__text'>
              <p>Через темный портал к нам ворвались варвары. Это оказалсь злобные и кровожадные орки. Заручившись помощью троллей мира Торезан они ринулись покорять его. <br></br>
              На защиту выступил ты - истинный хранитель этого мира.
            </p>
          </div>
        </div>
        <div className='landing-page__screenshoots' id='Screenshoots'>
          <a name='Screenshoot'></a>
          <div className='landing-page__screenshoots__content'>
            <div className='landing-page__screenshoots__content__screenshoots'>
              <img src='./images/screenshoot_game1.jpg' alt='Поле боя' />
              <img src='./images/screenshoot_game2.jpg' alt='Выбор действия' />
              <img src='./images/screenshoot_game3.jpg' alt='Выбор заклинания' />
              <img src='./images/screenshoot_game4.jpg' alt='Решение' />
              <img src='./images/screenshoot_game5.jpg' alt='Нанесение урона' />
              <img src='./images/screenshoot_game6.jpg' alt='Востановление жизней' />
            </div>
          </div>
        </div>
        <footer id='Contact'>
          <p><a href='https://github.com/Zerovers'>by Dmitry Kravtsov <i className="fab fa-github"></i></a></p>
        </footer>
      </div>
      </>
    )
  }
}
export default withRouter(HomeScreen);
