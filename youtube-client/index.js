function videoRequest(searchTerm) {
  const url = 'https://www.googleapis.com/youtube/v3/search?';
  const params = {
    part: 'part=snippet&',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
    q: `q= ${searchTerm}`,
    type: 'type=video&',
    maxResults: 'maxResults=15&',
  };
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url + params.key + params.type + params.part + params.maxResults + params.q, false);
  xhr.send();
  if (xhr.status !== 200) {
    console.log(xhr);
  } else {
    console.log(xhr);
  }
  const item = JSON.parse(xhr.response);
  const map = item.items.map((a) => {
    let time = a.snippet.publishedAt;
    time = time.split('T');
    return {
      id: a.id.videoId,
      photo: a.snippet.thumbnails.high.url,
      Name: a.snippet.channelTitle,
      time: time[0],
      discription: a.snippet.description,
      title: a.snippet.title,
      pageToken: item.nextPageToken,
    };
  });
  statisticRequest(map);
  addvideo(map);
  return map;
}

function videoRequest2(searchTerm, obj) {
  const url = 'https://www.googleapis.com/youtube/v3/search?';
  const params = {
    part: 'part=snippet&',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
    q: `q= ${searchTerm}`,
    type: 'type=video&',
    maxResults: 'maxResults=15&',
    pageToken: `pageToken= ${obj[obj.length - 1].pageToken}$ &`,
  };
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url + params.pageToken + params.key + params.type + params.part + params.maxResults + params.q, false);
  xhr.send();
  if (xhr.status !== 200) {
    console.log(xhr);
  } else {
    console.log(xhr);
  }
  const item = JSON.parse(xhr.response);
  const map2 = item.items.map((a) => {
    let time = a.snippet.publishedAt;
    time = time.split('T');
    return {
      id: a.id.videoId,
      photo: a.snippet.thumbnails.medium.url,
      Name: a.snippet.channelTitle,
      time: time[0],
      discription: a.snippet.description,
      title: a.snippet.title,
      pageToken: item.nextPageToken,
    };
  });
  statisticRequest(map2);
  addvideo(map2);
  return map2;
}

function statisticRequest(video) {
  const url = 'https://www.googleapis.com/youtube/v3/videos?';
  const params = {
    part: 'part=statistics',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
    id: `id= ${video.map(e => e.id).join(',')} &`,
  };
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url + params.key + params.id + params.part, false);
  xhr.send();
  if (xhr.status !== 200) {
    console.log(xhr);
  } else {
    console.log(xhr);
  }
  const item = JSON.parse(xhr.response);
  item.items.forEach((e, i) => { video[i].viewers = e.statistics.viewCount; });
}
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
function renderElement(name, obj) {
  const a = document.createElement(name);
  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      a[key] = obj[key];
    }
  }
  return a;
}
function renderPage(arr, page) {
  const content4 = renderElement('div', { className: 'content4 visible' });
  const matrix = document.querySelector('.matrix');
  matrix.appendChild(content4);
  const content3 = renderElement('div', { className: 'content3 visible' });
  matrix.appendChild(content3);
  const content2 = renderElement('div', { className: 'content2 visible' });
  matrix.appendChild(content2);
  const content1 = renderElement('div', { className: 'content1 visible' });
  matrix.appendChild(content1);
  if (page > 3) {
    for (let i = page; i < page + 4; i += 1) {
      const element = (arr[i].doomelement).cloneNode(true);
      content4.appendChild(element);
    }
  } else {
    for (let i = page * 0; i < page * 0 + 4; i += 1) {
      const element = (arr[i].doomelement).cloneNode(true);
      content4.appendChild(element);
    }
  }
  if (page > 2) {
    for (let i = page; i < page + 3; i += 1) {
      content3.appendChild((arr[i].doomelement).cloneNode(true));
    }
  } else {
    for (let i = page * 0; i < page * 0 + 3; i += 1) {
      const element = (arr[i].doomelement).cloneNode(true);
      content3.appendChild(element);
    }
  }
  if (page > 1) {
    for (let i = page; i < page + 2; i += 1) {
      content2.appendChild((arr[i].doomelement).cloneNode(true));
    }
  } else {
    for (let i = page * 0; i < page * 0 + 2; i += 1) {
      const element = (arr[i].doomelement).cloneNode(true);
      content2.appendChild(element);
    }
  }
  if (page > 0) {
    for (let i = page; i < page + 1; i += 1) {
      content1.appendChild((arr[i].doomelement).cloneNode(true));
    }
  } else {
    for (let i = page * 0; i < page * 1 + 1; i += 1) {
      const element = (arr[i].doomelement).cloneNode(true);
      content1.appendChild(element);
    }
  }
}
function renderVideo(data) {
  const div = renderElement('div', { className: 'test' });
  const img = renderElement('img', { src: data.photo });
  const name = renderElement('p', { innerHTML: data.Name, className: 'chanel' });
  const time = renderElement('p', { innerHTML: data.time, className: 'time' });
  const viewer = renderElement('p', { innerHTML: data.viewers, className: 'count' });
  const discription = renderElement('div', { innerHTML: data.discription, className: 'discription' });
  const title = renderElement('div', { className: 'title' });
  const link = renderElement('a', { innerHTML: data.title, href: `https://www.youtube.com/watch?v= ${data.id}` });
  div.appendChild(img);
  div.appendChild(name);
  div.appendChild(time);
  div.appendChild(viewer);
  div.appendChild(discription);
  div.appendChild(title);
  title.appendChild(link);
  return div;
}
function addvideo(a) {
  a.forEach((e) => { e.doomelement = renderVideo(e); });
}
function removePage() {
  const matrix = document.querySelector('.matrix');
  const child4 = document.querySelector('.content4');
  const child3 = document.querySelector('.content3');
  const child2 = document.querySelector('.content2');
  const child1 = document.querySelector('.content1');
  matrix.removeChild(child4);
  matrix.removeChild(child3);
  matrix.removeChild(child2);
  matrix.removeChild(child1);
}
function renderButton(name, count) {
  const body = document.querySelector('.body');
  const butt = renderElement('div', { className: `${name} target` });
  const left = renderElement('i', { className: 'left fas fa-caret-left' });
  const right = renderElement('i', { className: 'right fas fa-caret-right' });
  const pageCount = renderElement('div', { innerHTML: count + 1, className: `${name}-count` });
  butt.appendChild(left);
  butt.appendChild(pageCount);
  butt.appendChild(right);
  body.appendChild(butt);
}
function renderTooltip(currentPage, down, top) {
  const body = document.querySelector('.body');
  const tooltip1 = renderElement('p', { className: 'tooltip1 live' });
  const tooltip2 = renderElement('p', { className: 'tooltip2 live' });
  const tooltip3 = renderElement('p', { className: 'tooltip3 live' });
  const tooltip4 = renderElement('p', { className: 'tooltip4 live' });
  tooltip1.innerHTML = currentPage + 1;
  tooltip2.innerHTML = Math.ceil((currentPage + 1) / 2);
  tooltip3.innerHTML = Math.ceil((currentPage + 1) / 3);
  tooltip4.innerHTML = Math.ceil((currentPage + 1) / 4);
  body.appendChild(tooltip1);
  body.appendChild(tooltip2);
  body.appendChild(tooltip3);
  body.appendChild(tooltip4);
  tooltip1.style.left = `${down}px`;
  tooltip1.style.top = `${top - 25}px`;
  tooltip2.style.left = `${down}px`;
  tooltip2.style.top = `${top - 25}px`;
  tooltip3.style.left = `${down}px`;
  tooltip3.style.top = `${top - 25}px`;
  tooltip4.style.left = `${down}px`;
  tooltip4.style.top = `${top - 25}px`;
}
