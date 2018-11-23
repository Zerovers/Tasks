import { renderPage, removePage } from './renderElement';
import { makeRequestPageToken } from './XMLHttpRequest';

export function mathPageToLeft(obj) {
  let newpage = obj.currentPage;
  if (obj.event.target === obj.leftButton[3]) {
    newpage -= 3;
  } if (obj.event.target === obj.leftButton[2]) {
    newpage -= 2;
  } if (obj.event.target === obj.leftButton[1]) {
    newpage -= 2;
  } if (obj.event.target === obj.leftButton[0]) {
    newpage -= 1;
  }
  if (newpage < 0) {
    newpage = 0;
  }
  return newpage;
}
export function mathPageToRight(obj) {
  let newpage = obj.currentPage;
  if (obj.event.target === obj.rightButton[3]) {
    newpage += 3;
  } if (obj.event.target === obj.rightButton[2]) {
    newpage += 2;
  } if (obj.event.target === obj.rightButton[1]) {
    newpage += 2;
  } if (obj.event.target === obj.rightButton[0]) {
    newpage += 1;
  }
  return newpage;
}
export function eventButtonRight(obj) {
  let newinfo = obj.info;
  const newpage = mathPageToRight(obj);
  const pageCount1 = document.querySelector('.button-one-video-count');
  const pageCount2 = document.querySelector('.button-two-video-count');
  const pageCount3 = document.querySelector('.button-three-video-count');
  const pageCount4 = document.querySelector('.button-four-video-count');
  pageCount1.innerHTML = newpage + 1;
  pageCount2.innerHTML = Math.ceil((newpage + 1) / 2);
  pageCount3.innerHTML = Math.ceil((newpage + 1) / 3);
  pageCount4.innerHTML = Math.ceil((newpage + 1) / 4);
  if (newinfo.length - newpage < 6) {
    const info2 = makeRequestPageToken(obj.result, newinfo);
    newinfo = newinfo.concat(info2);
  }
  renderPage(newinfo, newpage);
  const object = { newpage, newinfo };
  return object;
}
export function eventButtonLeft(obj) {
  const newpage = mathPageToLeft(obj);
  const pageCount1 = document.querySelector('.button-one-video-count');
  const pageCount2 = document.querySelector('.button-two-video-count');
  const pageCount3 = document.querySelector('.button-three-video-count');
  const pageCount4 = document.querySelector('.button-four-video-count');
  pageCount1.innerHTML = newpage + 1;
  pageCount2.innerHTML = Math.ceil((newpage + 1) / 2);
  pageCount3.innerHTML = Math.ceil((newpage + 1) / 3);
  pageCount4.innerHTML = Math.ceil((newpage + 1) / 4);
  renderPage(obj.info, newpage);
  return newpage;
}
export function eventMouseRight(obj) {
  let newpage = obj.currentPage;
  let newinfo = obj.info;
  const content4 = getComputedStyle(document.querySelector('.content4')).display;
  const content3 = getComputedStyle(document.querySelector('.content3')).display;
  const content2 = getComputedStyle(document.querySelector('.content2')).display;
  document.querySelector('.content1.visible').classList.add('transition');
  document.querySelector('.content2.visible').classList.add('transition');
  document.querySelector('.content3.visible').classList.add('transition');
  document.querySelector('.content4.visible').classList.add('transition');
  setTimeout(removePage, 500);
  if (content4 === 'flex') {
    newpage += 3;
  } if (content3 === 'flex') {
    newpage += 2;
  } if (content2 === 'flex') {
    newpage += 2;
  } else {
    newpage += 1;
  }
  const pageCount1 = document.querySelector('.button-one-video-count');
  const pageCount2 = document.querySelector('.button-two-video-count');
  const pageCount3 = document.querySelector('.button-three-video-count');
  const pageCount4 = document.querySelector('.button-four-video-count');
  pageCount1.innerHTML = newpage + 1;
  pageCount2.innerHTML = Math.ceil((newpage + 1) / 2);
  pageCount3.innerHTML = Math.ceil((newpage + 1) / 3);
  pageCount4.innerHTML = Math.ceil((newpage + 1) / 4);
  if (obj.info.length - newpage < 6) {
    const info2 = makeRequestPageToken(obj.result, newinfo);
    newinfo = newinfo.concat(info2);
  }
  setTimeout(renderPage, 500, newinfo, newpage);
  document.onmousemove = null;
  const object = { newpage, newinfo };
  return object;
}
export function eventMouseLeft(obj) {
  let newpage = obj.currentPage;
  const newinfo = obj.info;
  const content4 = getComputedStyle(document.querySelector('.content4')).display;
  const content3 = getComputedStyle(document.querySelector('.content3')).display;
  const content2 = getComputedStyle(document.querySelector('.content2')).display;
  document.querySelector('.content1.visible').classList.add('transition');
  document.querySelector('.content2.visible').classList.add('transition');
  document.querySelector('.content3.visible').classList.add('transition');
  document.querySelector('.content4.visible').classList.add('transition');
  setTimeout(removePage, 500);
  if (content4 === 'flex') {
    newpage -= 3;
  } if (content3 === 'flex') {
    newpage -= 2;
  } if (content2 === 'flex') {
    newpage -= 2;
  } else {
    newpage -= 1;
  }
  if (newpage < 1) {
    newpage = 0;
  }
  const pageCount1 = document.querySelector('.button-one-video-count');
  const pageCount2 = document.querySelector('.button-two-video-count');
  const pageCount3 = document.querySelector('.button-three-video-count');
  const pageCount4 = document.querySelector('.button-four-video-count');
  pageCount1.innerHTML = newpage + 1;
  pageCount2.innerHTML = Math.ceil((newpage + 1) / 2);
  pageCount3.innerHTML = Math.ceil((newpage + 1) / 3);
  pageCount4.innerHTML = Math.ceil((newpage + 1) / 4);
  setTimeout(renderPage, 500, newinfo, newpage);
  document.onmousemove = null;
  return newpage;
}
export function eventTouchRight(obj) {
  let newpage = obj.currentPage;
  let newinfo = obj.info;
  const content4 = getComputedStyle(document.querySelector('.content4')).display;
  const content3 = getComputedStyle(document.querySelector('.content3')).display;
  const content2 = getComputedStyle(document.querySelector('.content2')).display;
  document.querySelector('.content1.visible').classList.add('transition');
  document.querySelector('.content2.visible').classList.add('transition');
  document.querySelector('.content3.visible').classList.add('transition');
  document.querySelector('.content4.visible').classList.add('transition');
  setTimeout(removePage, 500);
  if (content4 === 'flex') {
    newpage += 3;
  } if (content3 === 'flex') {
    newpage += 2;
  } if (content2 === 'flex') {
    newpage += 2;
  } else {
    newpage += 1;
  }
  const pageCount1 = document.querySelector('.button-one-video-count');
  const pageCount2 = document.querySelector('.button-two-video-count');
  const pageCount3 = document.querySelector('.button-three-video-count');
  const pageCount4 = document.querySelector('.button-four-video-count');
  pageCount1.innerHTML = newpage + 1;
  pageCount2.innerHTML = Math.ceil((newpage + 1) / 2);
  pageCount3.innerHTML = Math.ceil((newpage + 1) / 3);
  pageCount4.innerHTML = Math.ceil((newpage + 1) / 4);
  if (obj.info.length - newpage < 6) {
    const info2 = makeRequestPageToken(obj.result, newinfo);
    newinfo = newinfo.concat(info2);
  }
  setTimeout(renderPage, 500, newinfo, newpage);
  document.ontouchmove = null;
  const object = { newpage, newinfo };
  return object;
}
export function eventTouchLeft(obj) {
  let newpage = obj.currentPage;
  const newinfo = obj.info;
  const content4 = getComputedStyle(document.querySelector('.content4')).display;
  const content3 = getComputedStyle(document.querySelector('.content3')).display;
  const content2 = getComputedStyle(document.querySelector('.content2')).display;
  document.querySelector('.content1.visible').classList.add('transition');
  document.querySelector('.content2.visible').classList.add('transition');
  document.querySelector('.content3.visible').classList.add('transition');
  document.querySelector('.content4.visible').classList.add('transition');
  setTimeout(removePage, 500);
  if (content4 === 'flex') {
    newpage -= 3;
  } if (content3 === 'flex') {
    newpage -= 2;
  } if (content2 === 'flex') {
    newpage -= 2;
  } else {
    newpage -= 1;
  }
  if (newpage < 1) {
    newpage = 0;
  }
  const pageCount1 = document.querySelector('.button-one-video-count');
  const pageCount2 = document.querySelector('.button-two-video-count');
  const pageCount3 = document.querySelector('.button-three-video-count');
  const pageCount4 = document.querySelector('.button-four-video-count');
  pageCount1.innerHTML = newpage + 1;
  pageCount2.innerHTML = Math.ceil((newpage + 1) / 2);
  pageCount3.innerHTML = Math.ceil((newpage + 1) / 3);
  pageCount4.innerHTML = Math.ceil((newpage + 1) / 4);
  setTimeout(renderPage, 500, newinfo, newpage);
  document.ontouchmove = null;
  return newpage;
}
