export default function renderElement(name, obj) {
  const a = document.createElement(name);
  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      a[key] = obj[key];
    }
  }
  return a;
}

export function renderVideo(data) {
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
export function removePage() {
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
export function renderButton(name, count) {
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
export function renderTooltip(currentPage, down, top) {
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
export function renderPage(arr, page) {
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
export function startPage() {
  const wrapper = renderElement('div', { className: 'wrapper' });
  const form = renderElement('form', { className: 'blocks', action: '#', method: 'get' });
  const p = renderElement('p');
  const i = renderElement('i', { className: 'fas fa-search' });
  const input = renderElement('input', { className: 'search', type: 'text' });
  const matrix = renderElement('div', { className: 'matrix' });
  const body = document.querySelector('.body');
  p.appendChild(i);
  p.appendChild(input);
  form.appendChild(p);
  wrapper.appendChild(form);
  body.appendChild(wrapper);
  body.appendChild(matrix);
}
