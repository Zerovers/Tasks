setTimeout(a,1000);

function a() {
  let arr = ['111111111111111', '22222222222222222', '33333333333333',
  '4444444444444444444', '55555555555555555', '666666666666666666'];
  renderComponent(arr);
 
  let pageCount = 0;
  let ul = document.querySelector('ul');
  ul.addEventListener('click', e => {
    if(!(e.target.classList.contains('active')) && e.target.classList.contains('li')) {
      document.querySelector('.active').classList.remove('active');
      e.target.classList.toggle('active');
    }
  });

  let input = document.querySelector('#checkbox');
    if(input.checked) {

    }
  let localValue = localStorage.setItem('checked', input.checked)



  let right = document.querySelector('.right')
  right.addEventListener('click', e => {
    let page = document.querySelector('.page');
    let p = document.querySelector('.p');
    let ul = document.querySelector('.ul');
    let len = ul.childNodes;
    page.removeChild(p);
    len[pageCount].classList.remove('active');
    pageCount += 1;
    if(pageCount > 5) {
      pageCount = 0;
    }
    len[pageCount].classList.add('active');
    let newp = element('p', {innerHTML: arr[pageCount], className: 'p'});
    page.appendChild(newp);
  });

  let left = document.querySelector('.left')
  left.addEventListener('click', e => {
    let page = document.querySelector('.page');
    let p = document.querySelector('.p');
    let ul = document.querySelector('.ul');
    let len = ul.childNodes;
    page.removeChild(p);
    len[pageCount].classList.remove('active');
    pageCount -= 1;
    if(pageCount < 0) {
      pageCount = 5;
    }
    len[pageCount].classList.add('active');
    let newp = element('p', {innerHTML: arr[pageCount], className: 'p'});
    page.appendChild(newp);  
  }); 

  

let cross = document.querySelector('.cross');
cross.addEventListener('click', e => {
    let notification = document.querySelector('.notification');
    notification.style.display = 'none';
  });

  document.addEventListener('keydown', e => {
    if(e.keyCode === 39) {
    let page = document.querySelector('.page');
    let p = document.querySelector('.p');
    let ul = document.querySelector('.ul');
    let len = ul.childNodes;
    page.removeChild(p);
    len[pageCount].classList.remove('active');
    pageCount += 1;
    if(pageCount > 5) {
      pageCount = 0;
    }
    len[pageCount].classList.add('active');
    let newp = element('p', {innerHTML: arr[pageCount], className: 'p'});
    page.appendChild(newp);
    }
    if(e.keyCode === 37) {
    let page = document.querySelector('.page');
    let p = document.querySelector('.p');
    let ul = document.querySelector('.ul');
    let len = ul.childNodes;
    page.removeChild(p);
    len[pageCount].classList.remove('active');
    pageCount -= 1;
    if(pageCount < 0) {
      pageCount = 5;
    }
    len[pageCount].classList.add('active');
    let newp = element('p', {innerHTML: arr[pageCount], className: 'p'});
    page.appendChild(newp);  
    }
    if(e.keyCode === 27) {
      let notification = document.querySelector('.notification');
    notification.style.display = 'none';
    }
  });

};

function renderComponent(arr) {
  let body = document.body;
  let notification = element('div', {className: 'notification'});
  let page = element('div', {className: 'page'});
  let h = element('h1', {innerHTML: 'EMAIL TIP OF THE DAY'})
  let p = element('p', {innerHTML: arr[0], className: 'p'});
  let cross = element('div', {className: 'cross'});
  let checkbox = element('div', {className: 'checkbox'});
  let input = element('input', {type: 'checkbox', name: 'Disable Tips', id: 'checkbox'});
  let label = element('label', {for: 'Disable Tips', innerHTML: 'Disable Tips'})
  let pagenation = element('div', {className: 'pagenation'});
  let left = element('div', {className: 'left'});
  let right = element('div', {className: 'right'});
  let ul = element('ul', {className: 'ul'});
  
  
  body.appendChild(notification);
  page.appendChild(h);
  page.appendChild(p);
  notification.appendChild(page);
  notification.appendChild(cross);
  checkbox.appendChild(input);
  checkbox.appendChild(label);
  notification.appendChild(checkbox);
  pagenation.appendChild(left);
  pagenation.appendChild(ul);
  for(let i = 0; i < 6; i += 1) {
    if(i === 0) {
      let li = element('li', {className: 'li'+' ' + i +' active'});
      ul.appendChild(li);  
    } else {
      let li = element('li', {className: 'li' + ' ' + i});
      ul.appendChild(li);
    }
  }
  pagenation.appendChild(right);
  notification.appendChild(pagenation);
};

function element(name,obj) {
  let a = document.createElement(name);
  for(let key in obj) {
    a[key] = obj[key];
  }
  return a;
};



function load() {
  if(localValue === 'checked') {
    let notification = document.querySelector('.notification');
    notification.style.display = 'none';
  }
}





