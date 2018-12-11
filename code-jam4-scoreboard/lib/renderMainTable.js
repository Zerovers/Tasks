import { renderElement } from '../lib/renderAssist';
import session from '../src/test.json';
import users from '../src/users.json';

export function renderMainTable(allPuzzleName) {
  const demobutton = document.querySelector('#rsschool-demo');
  demobutton.checked = false;
  const rsschoolBeforeRadio = document.querySelector('#rsschool-before');
  rsschoolBeforeRadio.checked = false;
  let demoTable = document.querySelector('.demo');
  if (demoTable) {
    demoTable.remove();
  }
  let tableBefore = document.querySelector('.before');
  if (tableBefore) {
    tableBefore.remove();
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
  allPuzzleName = [];
  for (let i = 0; i <= session.puzzles.length; i += 1) {
    let td;
    if (i == 10) {
      td = renderElement('td', { className: `header ${i}`, innerHTML: 'Общее время' });
    } else {
      td = renderElement('td', { className: `header ${i}`, innerHTML: `${session.puzzles[i].name}` });
      allPuzzleName.push(session.puzzles[i].name);
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
    let atr = [];
    for (let j = 0; j <= 10; j += 1) {
      let td = renderElement('td', { className: `tooltip ${j}` });
      if (j == 10) {
        td.innerHTML = `${sum}`;
        tr[i].appendChild(td);
      } else if (typeof session.rounds[j].solutions[users[i].uid] === 'undefined' || session.rounds[j].solutions[users[i].uid].correct === 'Incorrect') {
          td.innerHTML = 150;
          sum += 150;
          atr.push(150);
          td.classList.remove('tooltip');
        } else {
          td.innerHTML = `${session.rounds[j].solutions[users[i].uid].time.$numberLong}`;
          sum += parseInt(session.rounds[j].solutions[users[i].uid].time.$numberLong);
          atr.push(parseInt(session.rounds[j].solutions[users[i].uid].time.$numberLong));
          td.setAttribute('data-tooltip', session.rounds[j].solutions[users[i].uid].code);
        }
        tr[i].appendChild(td);
        tr[i].setAttribute('info', atr)
      }
    }
  
  return allPuzzleName;
}
