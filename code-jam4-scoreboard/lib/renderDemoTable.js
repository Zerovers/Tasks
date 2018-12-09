import demo from '../src/demo.json';
import users from '../src/users.json';
import { renderElement } from './renderAssist'

export function renderDemoTable(allCheckName, allCheckData) {
  allCheckName = [];
  allCheckData = [];
  if (document.querySelector('#chart')) {
    document.querySelector('#chart').remove();
  }
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
  let second = renderElement('td', { className: `pazzle-info`, innerHTML: `${demo.puzzles[0].name}` });
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