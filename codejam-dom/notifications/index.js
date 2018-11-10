setTimeout(a,1000);

function a() {
let body = document.body;
let notification = element('div', {className: 'notification'});
let page = element('div', {className: 'page'});
let cross = element('div', {className: 'cross'});
body.appendChild(notification);
notification.appendChild(page);
notification.appendChild(cross);



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




