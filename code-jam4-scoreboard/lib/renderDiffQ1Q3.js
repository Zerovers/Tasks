import users from '../src/users.json';
import usersBefore from '../src/users.before.json';
import sessionBefore from '../src/sessions.before.json';
import session from '../src/test.json';
import { renderElement } from '../lib/renderAssist';

export function renderDiffTabl(allPuzzleName) {
  const demobutton = document.querySelector('#rsschool-demo');
  demobutton.checked = false;
  const rsschool = document.querySelector('#rsschool');
  rsschool.checked = false;
  const demoTable = document.querySelector('.demo');
  if (demoTable) {
    demoTable.remove();
  }
  if (document.querySelector('#chart')) {
    document.querySelector('#chart').remove();
  }
  const mainTable = document.querySelector('.main');
  if (mainTable) {
    mainTable.remove();
  }
  const table = renderElement('table', { className: 'before' });
  const tbody = renderElement('tbody', { className: 'rsschool-before' });
  let head = renderElement('tr', { id: 'head' });
  tbody.appendChild(head);
  table.appendChild(tbody);
  document.body.appendChild(table);
  head = document.querySelector('#head');
  let first = renderElement('td', { className: `header`, innerHTML: 'DisplayName' });
  head.appendChild(first);
  for (let i = 0; i <= sessionBefore.puzzles.length; i += 1) {
    let td;
    if (i == 10) {
      td = renderElement('td', { className: `header ${i}`, innerHTML: 'Общее время Q1' });
    } else {
      td = renderElement('td', { className: `header ${i}`, innerHTML: `${sessionBefore.puzzles[i].name}` });
      allPuzzleName.push(sessionBefore.puzzles[i].name);
    }
    head.appendChild(td);
  }
  const tdQ3 = renderElement('td', { className: 'header 11', innerHTML: 'Общее время Q3' });
  head.appendChild(tdQ3);
  const tdQ3diff = renderElement('td', { className: 'header 12', innerHTML: 'Разница Во Времени' });
  head.appendChild(tdQ3diff);
  const mainTableBefore = document.querySelector('.rsschool-before');
  for (let i = 0; i < usersBefore.length; i += 1) {
    for (let j = 0; j < users.length; j += 1) {
      if (usersBefore[i].displayName === users[j].displayName) {
        const trQ1 = renderElement('tr', { className: `name ${i}`, innerHTML: `${usersBefore[i].displayName}` });
        mainTableBefore.appendChild(trQ1);
        let sum = 0;
        let sumQ3 = 0;
        for (let k = 0; k <= 10; k += 1) {
          let td = renderElement('td', { className: `${k}` });
          if (k == 10) {
            td.innerHTML = `${sum}`;
            trQ1.appendChild(td);
          } else if (typeof sessionBefore.rounds[k].solutions[usersBefore[i].uid] === 'undefined' || sessionBefore.rounds[k].solutions[usersBefore[i].uid].correct === 'Incorrect') {
            td.innerHTML = 150;
            sum += 150;
          } else {
            td.innerHTML = `${sessionBefore.rounds[k].solutions[usersBefore[i].uid].time.$numberLong}`;
            sum += parseInt(sessionBefore.rounds[k].solutions[usersBefore[i].uid].time.$numberLong);
          }
          if (k < 10) {
            if (typeof session.rounds[k].solutions[users[j].uid] === 'undefined' || session.rounds[k].solutions[users[j].uid].correct === 'Incorrect') {
              sumQ3 += 150;
            } else {
              sumQ3 += parseInt(session.rounds[k].solutions[users[j].uid].time.$numberLong);
            }
          }

          trQ1.appendChild(td);
        }
        const tdQ3 = renderElement('td', { className: '12' });
        const tdDiff = renderElement('td', { className: '13' });
        tdQ3.innerHTML = `${sumQ3}`;
        trQ1.appendChild(tdQ3);
        if (sum < sumQ3) {
          tdDiff.innerHTML = 'Медленее';
        } else if (sum > sumQ3) {
          tdDiff.innerHTML = 'Быстрее';
        } else {
          tdDiff.innerHTML = 'Так же';
        }
        trQ1.appendChild(tdDiff);
      }
    }
  }
}