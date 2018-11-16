import {
  videoRequest,
  videoRequest2,
} from './lib/XMLHttpRequest';
import {
  removePage,
  renderButton,
  renderTooltip,
  renderPage,
  startPage,
} from './lib/renderElement';

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
      const body = document.querySelector('.body');
      const allbutton = document.querySelectorAll('.target');
      for (let i = 0; i < allbutton.length; i += 1) {
        body.removeChild(allbutton[i]);
      }
    }
    renderButton('button1', currentPage);
    renderButton('button2', currentPage);
    renderButton('button3', currentPage);
    renderButton('button4', currentPage);
    renderPage(info, currentPage);
    const rightButton = document.querySelectorAll('.right');
    rightButton.forEach(el => el.addEventListener('click', (event) => {
      removePage();
      if (event.target === rightButton[3]) {
        currentPage += 3;
      } if (event.target === rightButton[2]) {
        currentPage += 2;
      } if (event.target === rightButton[1]) {
        currentPage += 2;
      } else {
        currentPage += 1;
      }
      const pageCount1 = document.querySelector('.button1-count');
      const pageCount2 = document.querySelector('.button2-count');
      const pageCount3 = document.querySelector('.button3-count');
      const pageCount4 = document.querySelector('.button4-count');
      pageCount1.innerHTML = currentPage + 1;
      pageCount2.innerHTML = Math.ceil((currentPage + 1) / 2);
      pageCount3.innerHTML = Math.ceil((currentPage + 1) / 3);
      pageCount4.innerHTML = Math.ceil((currentPage + 1) / 4);
      if (info.length - currentPage < 6) {
        const info2 = videoRequest2(result, info);
        info = info.concat(info2);
      }
      renderPage(info, currentPage);
    }));
    const leftButton = document.querySelectorAll('.left');
    leftButton.forEach(el => el.addEventListener('click', (event) => {
      removePage();
      if (event.target === leftButton[3]) {
        currentPage -= 3;
      } if (event.target === leftButton[2]) {
        currentPage -= 2;
      } if (event.target === leftButton[1]) {
        currentPage -= 2;
      } else {
        currentPage -= 1;
      }
      if (currentPage < 0) {
        currentPage = 0;
      }
      const pageCount1 = document.querySelector('.button1-count');
      const pageCount2 = document.querySelector('.button2-count');
      const pageCount3 = document.querySelector('.button3-count');
      const pageCount4 = document.querySelector('.button4-count');
      pageCount1.innerHTML = currentPage + 1;
      pageCount2.innerHTML = Math.ceil((currentPage + 1) / 2);
      pageCount3.innerHTML = Math.ceil((currentPage + 1) / 3);
      pageCount4.innerHTML = Math.ceil((currentPage + 1) / 4);
      renderPage(info, currentPage);
    }));
    document.onmouseup = () => {
      const alltool = document.querySelectorAll('.live');
      if (alltool.length > 0) {
        const body = document.querySelector('.body');
        const tooltip1 = document.querySelector('.tooltip1');
        const tooltip2 = document.querySelector('.tooltip2');
        const tooltip3 = document.querySelector('.tooltip3');
        const tooltip4 = document.querySelector('.tooltip4');
        body.removeChild(tooltip1);
        body.removeChild(tooltip2);
        body.removeChild(tooltip3);
        body.removeChild(tooltip4);
      }
    };
    const matrix = document.querySelector('.matrix');
    matrix.onmousedown = (event) => {
      const down = event.pageX;
      const top = event.pageY;
      renderTooltip(currentPage, down, top);
      document.onmousemove = (ev) => {
        if (ev.which !== 1) {
          return;
        }
        if (down + 150 < ev.pageX) {
          const content4 = getComputedStyle(document.querySelector('.content4')).display;
          const content3 = getComputedStyle(document.querySelector('.content3')).display;
          const content2 = getComputedStyle(document.querySelector('.content2')).display;
          document.querySelector('.content1.visible').classList.add('transition');
          document.querySelector('.content2.visible').classList.add('transition');
          document.querySelector('.content3.visible').classList.add('transition');
          document.querySelector('.content4.visible').classList.add('transition');
          setTimeout(removePage, 1000);
          if (content4 === 'flex') {
            currentPage += 3;
          } if (content3 === 'flex') {
            currentPage += 2;
          } if (content2 === 'flex') {
            currentPage += 2;
          } else {
            currentPage += 1;
          }
          const pageCount1 = document.querySelector('.button1-count');
          const pageCount2 = document.querySelector('.button2-count');
          const pageCount3 = document.querySelector('.button3-count');
          const pageCount4 = document.querySelector('.button4-count');
          pageCount1.innerHTML = currentPage + 1;
          pageCount2.innerHTML = Math.ceil((currentPage + 1) / 2);
          pageCount3.innerHTML = Math.ceil((currentPage + 1) / 3);
          pageCount4.innerHTML = Math.ceil((currentPage + 1) / 4);
          if (info.length - currentPage < 6) {
            const info2 = videoRequest2(result, info);
            info = info.concat(info2);
          }
          setTimeout(renderPage, 1000, info, currentPage);
          document.onmousemove = null;
        }
        if (down - 150 > ev.pageX) {
          const content4 = getComputedStyle(document.querySelector('.content4')).display;
          const content3 = getComputedStyle(document.querySelector('.content3')).display;
          const content2 = getComputedStyle(document.querySelector('.content2')).display;
          document.querySelector('.content1.visible').classList.add('transition');
          document.querySelector('.content2.visible').classList.add('transition');
          document.querySelector('.content3.visible').classList.add('transition');
          document.querySelector('.content4.visible').classList.add('transition');
          setTimeout(removePage, 1000);
          if (content4 === 'flex') {
            currentPage -= 3;
          } if (content3 === 'flex') {
            currentPage -= 2;
          } if (content2 === 'flex') {
            currentPage -= 2;
          } else {
            currentPage -= 1;
          }
          if (currentPage < 1) {
            currentPage = 0;
          }
          const pageCount1 = document.querySelector('.button1-count');
          const pageCount2 = document.querySelector('.button2-count');
          const pageCount3 = document.querySelector('.button3-count');
          const pageCount4 = document.querySelector('.button4-count');
          pageCount1.innerHTML = currentPage + 1;
          pageCount2.innerHTML = Math.ceil((currentPage + 1) / 2);
          pageCount3.innerHTML = Math.ceil((currentPage + 1) / 3);
          pageCount4.innerHTML = Math.ceil((currentPage + 1) / 4);
          setTimeout(renderPage, 1000, info, currentPage);
          document.onmousemove = null;
        }
      };
      document.ondragstart = () => false;
    };
  });
});
