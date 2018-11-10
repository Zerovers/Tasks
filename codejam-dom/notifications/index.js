setTimeout(a,1000);

function a() {
let body = document.body;
let notification = element('div', {className: 'notification'});
let page = element('div', {className: 'page'});
let cross = element('div', {className: 'cross'});
let checkbox = element('div', {className: 'checkbox'});
let input = element('input', {type: 'checkbox', name: 'Disable Tips'});
let label = element('label', {for: 'Disable Tips', innerHTML: 'Disable Tips'})
let pagenation = element('div', {className: 'pagenation'});
let left = element('div', {className: 'left'});
let right = element('div', {className: 'right'});
let ul = element('ul', {className: 'ul'});


body.appendChild(notification);
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


ul.addEventListener('click', e => {
  if(!(e.target.classList.contains('active')) && e.target.classList.contains('li')) {
    document.querySelector('.active').classList.remove('active');
    e.target.classList.toggle('active');
  }
});


cross.addEventListener('click', e => {
    notification.style.display = 'none';
  })
}

function element(name,obj) {
  let a = document.createElement(name);
  for(let key in obj) {
    a[key] = obj[key];
  }
  return a;
};




