import session from './src/test.json';
import users from './src/users.json';
import demo from './src/demo.json';
var _ = require('lodash');

function renderElement(name, obj) {
  const element = document.createElement(name);
  Object.getOwnPropertyNames(obj).forEach((e) => {
    element[e] = obj[e];
  });
  return element;
}


console.log(demo);

// Create table with info 
const ckeckboxfull = document.querySelector('#rsschool');
ckeckboxfull.addEventListener('change', (event) => {
  if (event.target) {
    const demobutton = document.querySelector('#rsschool-demo');
    demobutton.checked = false;
    const demoTable = document.querySelector('.demo');
    if (demoTable) {
      demoTable.remove();
    }
    const table = renderElement('table', { className: 'main' });
    const tbody = renderElement('tbody', { className: 'rsschool' });
    let head = renderElement('tr', { id: 'head' });
    tbody.appendChild(head);
    table.appendChild(tbody);
    document.body.appendChild(table);
    head = document.querySelector('#head');
    let first = renderElement('td', { className: `header`, innerHTML: 'DisplayName' });
    head.appendChild(first);
    //Create header table
    for (let i = 0; i <= session.puzzles.length; i += 1) {
      let td;
      if (i == 10) {
        td = renderElement('td', { className: `header ${i}`, innerHTML: 'Общее время' });
      } else {
        td = renderElement('td', { className: `header ${i}`, innerHTML: `${session.puzzles[i].name}` });
      }
      head.appendChild(td);
    }
    //Create all column and row with info
    const mainTable = document.querySelector('.rsschool');
    for (let i = 0; i < users.length; i += 1) {
      const tr = renderElement('tr', { className: `name ${i}`, innerHTML: `${users[i].displayName}` });
      mainTable.appendChild(tr);
    }
    for (let i = 0; i < users.length; i += 1) {
      let tr = document.querySelectorAll('.name');
      let sum = 0;
      for (let j = 0; j <= 10; j += 1) {
        let td = renderElement('td', { className: `${j}` });
        if (j == 10) {
          td.innerHTML = `${sum}`;
          tr[i].appendChild(td);
        } else {
          if (typeof session.rounds[j].solutions[users[i].uid] === 'undefined' || session.rounds[j].solutions[users[i].uid].correct === 'Incorrect') {
            td.innerHTML = 150;
            sum += 150;
          } else {
            td.innerHTML = `${session.rounds[j].solutions[users[i].uid].time.$numberLong}`;
            td.setAttribute('code', session.rounds[j].solutions[users[i].uid].code);
            sum += parseInt(session.rounds[j].solutions[users[i].uid].time.$numberLong);
          }
          tr[i].appendChild(td);
        }
      }
    }
    //Create column with checkox
    let tr = document.querySelectorAll('.name');
    for (let i = 0; i < users.length; i += 1) {
      let td = renderElement('td', { className: `checkbox ${i}` });
      let checkbox = renderElement('input', { type: 'checkbox' });
      td.appendChild(checkbox);
      tr[i].appendChild(td);
    }
  }
  // Create tooltipe with setTimeout
  let setTimeoutConst, setTimeoutConst2;
  let tableCell = document.querySelectorAll('.name');
  tableCell.forEach(el => el.addEventListener("mouseover", function (event) {
    setTimeoutConst = setTimeout(function () {
      const down = event.clientX;
      const top = event.clientY;
      if (event.target.hasAttribute('code')) {
        let tooltip = document.querySelector('.tooltip');
        let result = event.target.getAttribute('code');
        renderTooltip(result, down, top);
      }
    }, 1000);
  }));
  tableCell.forEach(el => el.addEventListener("mouseout", function (event) {
    clearTimeout(setTimeoutConst);
    setTimeoutConst2 = setTimeout(function () {
    }, 500);
    let tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }));
})

//Create table with demo-info
const checkboxdemo = document.querySelector('#rsschool-demo');
checkboxdemo.addEventListener('change', (event) => {
  if(event.target) {
    const mainTable = document.querySelector('.main');
    mainTable.remove();
    const mainbutton = document.querySelector('#rsschool');
    mainbutton.checked = false;
    const table = renderElement('table', { className: 'demo' });
    const tbody = renderElement('tbody', { className: 'rsschool-demo' });
    let head = renderElement('tr', { id: 'head' });
    tbody.appendChild(head);
    table.appendChild(tbody);
    document.body.appendChild(table);
    head = document.querySelector('#head');
    let first = renderElement('td', { className: `header`, innerHTML: 'DisplayName' });
    let second = renderElement('td', { className: `pazzle-info`, innerHTML: 'pazzle' });
    let third = renderElement('td', { className: `info`, innerHTML: 'time' });
    head.appendChild(first);
    head.appendChild(second);
    head.appendChild(third);
    const demoTable = document.querySelector('.rsschool-demo');
    for (let i = 0; i < users.length; i += 1) {
      const tr = renderElement('tr', { className: `name ${i}`, innerHTML: `${users[i].displayName}` });
      demoTable.appendChild(tr);
    }
    for (let i = 0; i < users.length; i += 1) {
      let tr = document.querySelectorAll('.name');
      for(let j = 0; j < 2; j += 1) {
        let td = renderElement('td', { innerHTML: `We dont have data :(` });
        tr[i].appendChild(td);
      }
    }
  }
})


function renderTooltip(result, down, top) {
  const tooltip = renderElement('p', { className: 'tooltip', innerHTML: `${result}` });
  document.body.appendChild(tooltip);
  tooltip.style.left = `${down + 25}px`;
  tooltip.style.top = `${top - 25}px`;
}








