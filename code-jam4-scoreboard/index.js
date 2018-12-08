import session from './src/test.json';
import users from './src/users.json';
var _ = require('lodash');

function renderElement(name, obj) {
  const element = document.createElement(name);
  Object.getOwnPropertyNames(obj).forEach((e) => {
    element[e] = obj[e];
  });
  return element;
}


console.log(session);
console.log(users);
console.log(users[0]);


const head = document.querySelector('#head');
for (let i = 0; i <= session.puzzles.length; i += 1) {
  let td;
  if(i == 10) {
    td = renderElement('td', { className: `header ${i}`, innerHTML: 'Общее время' });
  } else {
    td = renderElement('td', { className: `header ${i}`, innerHTML: `${session.puzzles[i].name}` });
  }
  head.appendChild(td);
}

const mainTable = document.querySelector('.rsschool');
for (let i = 0; i < users.length; i += 1) {
  const tr = renderElement('tr', { className: `name ${i}`, innerHTML: `${users[i].displayName}` });
  mainTable.appendChild(tr);
}

for (let i = 0; i < users.length; i += 1) {
  let tr = document.querySelectorAll('.name');
  let sum = 0;
  for (let j = 0; j <= 10; j += 1) {
    let td = renderElement('td', {});
    if (j == 10) {
      td.innerHTML = `${sum}`;
      tr[i].appendChild(td);
    } else {
    if (typeof session.rounds[j].solutions[users[i].uid] === 'undefined' || session.rounds[j].solutions[users[i].uid].correct === 'Incorrect') {
      td.innerHTML = 150;
      sum += 150;
    } else {
      td.innerHTML = `${session.rounds[j].solutions[users[i].uid].time.$numberLong}`
      sum += parseInt(session.rounds[j].solutions[users[i].uid].time.$numberLong);
    }
    tr[i].appendChild(td);
    }
  }

}




