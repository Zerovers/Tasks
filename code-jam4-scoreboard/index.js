import users from './src/users.json';
var _ = require('lodash');
import Chart from './lib/Chart.bundle.min.js';
import { renderDemoTable } from './lib/renderDemoTable';
import { renderMainTable } from './lib/renderMainTable';
import { renderTooltip, renderElement } from './lib/renderAssist';
import { renderChart } from './lib/renderChart';
import { renderDiffTabl } from './lib/renderDiffQ1Q3';

let allCheckName = [];
let allCheckData = [];
let allPuzzleName = [];
// Create table with info 
const ckeckboxfull = document.querySelector('#rsschool');
ckeckboxfull.addEventListener('change', (event) => {
  allPuzzleName = renderMainTable(allPuzzleName);
  //Create column with checkox
  let tr = document.querySelectorAll('.name');
  for (let i = 0; i < users.length; i += 1) {
    let td = renderElement('td', { className: `checkbox ${i}` });
    let checkbox = renderElement('input', { type: 'checkbox' });
    td.appendChild(checkbox);
    tr[i].appendChild(td);
  }
  // Create button, what render canvas and get info for canvas
  const checkbox = document.querySelectorAll('input[type=checkbox]');
  checkbox.forEach(el => el.addEventListener('click', (event) => {
    const button = document.querySelector('#render');
    button.style.display = 'flex';
  }))
  const button = document.querySelector('#render');
  button.addEventListener('click', (event) => {
    renderChart(checkbox, button, allPuzzleName, allCheckName, allCheckData);
  })
})
//Create table with demo-info
const checkboxdemo = document.querySelector('#rsschool-demo');
checkboxdemo.addEventListener('change', (event) => {
  if (event.target) {
    renderDemoTable(allCheckName, allCheckData);
  }
})
//Create table with difference info
const checkboxbefore = document.querySelector('#rsschool-before');
checkboxbefore.addEventListener('change', (event) => {
  renderDiffTabl(allPuzzleName);
})
