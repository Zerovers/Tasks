import {
  videoRequest,
} from './lib/XMLHttpRequest';
import {
  removePage,
  renderButton,
  renderTooltip,
  renderPage,
  startPage,
} from './lib/renderElement';
import {
  eventButtonRight,
  eventButtonLeft,
  eventMouseRight,
  eventMouseLeft,
  eventTouchRight,
  eventTouchLeft,
} from './lib/controller';

document.addEventListener('DOMContentLoaded', () => {
  startPage();
  const search = document.querySelector('.search');
  search.addEventListener('change', (e) => {
    let currentPage = 0;
    const result = e.target.value;
    let info = videoRequest(result);
    if (document.querySelector('.visible')) {
      removePage();
    }
    if (document.querySelector('.target')) {
      const allbutton = document.querySelectorAll('.target');
      allbutton.forEach((element) => { element.remove(); });
    }
    renderButton('button1', currentPage);
    renderButton('button2', currentPage);
    renderButton('button3', currentPage);
    renderButton('button4', currentPage);
    renderPage(info, currentPage);
    const rightButton = document.querySelectorAll('.right');
    rightButton.forEach(el => el.addEventListener('click', (event) => {
      removePage();
      const newdata = eventButtonRight({
        event, currentPage, info, result, rightButton,
      });
      currentPage = newdata.newpage;
      info = newdata.newinfo;
    }));
    const leftButton = document.querySelectorAll('.left');
    leftButton.forEach(el => el.addEventListener('click', (event) => {
      removePage();
      currentPage = eventButtonLeft({
        event, info, currentPage, leftButton,
      });
    }));
    document.addEventListener('mouseup', () => {
      const alltool = document.querySelectorAll('.live');
      if (alltool.length > 0) {
        alltool.forEach((element) => { element.remove(); });
      }
    });
    const matrix = document.querySelector('.matrix');
    matrix.addEventListener('mousedown', (event) => {
      const down = event.pageX;
      const top = event.pageY;
      renderTooltip(currentPage, down, top);
      document.onmousemove = (ev) => {
        if (ev.which !== 1) {
          return;
        }
        if (down + 150 < ev.pageX) {
          const newdata = eventMouseRight({
            currentPage, result, info,
          });
          currentPage = newdata.newpage;
          info = newdata.newinfo;
        }
        if (down - 150 > ev.pageX) {
          currentPage = eventMouseLeft({
            currentPage, info,
          });
        }
      };
      document.ondragstart = () => false;
    });
    document.addEventListener('touchstart', (event) => {
      const down = event.changedTouches[0].clientX;
      document.ontouchmove = (ev) => {
        if (down + 100 < ev.changedTouches[0].clientX) {
          const newdata = eventTouchRight({
            currentPage, result, info,
          });
          currentPage = newdata.newpage;
          info = newdata.newinfo;
        }
        if (down - 100 > ev.changedTouches[0].clientX) {
          currentPage = eventTouchLeft({
            currentPage, info,
          });
        }
      };
    });
  });
});
