import { renderElement } from '../lib/renderAssist';

export function renderChart(checkbox, button, allPuzzleName, allCheckName, allCheckData) {
    allCheckName = [];
    allCheckData = [];
    checkbox.forEach((el,i) => {
      if (el.checked) {
        let checkName = el.parentElement.parentElement.innerText.replace(/[^a-zA-ZА-Яа-яЁё]/gi,'');
        allCheckName.push(checkName);
        let checkData = el.parentElement.parentElement.getAttribute('info').split(',');
        allCheckData.push(checkData.map(e => parseInt(e,10)));
      }
    })
    const canvas = renderElement('canvas', { id: 'chart' });
    const ctx = canvas.getContext('2d');
    const table = document.querySelector('.main');
    if (document.querySelector('#chart')) {
      document.querySelector('#chart').remove();
    }
    document.body.insertBefore(canvas, table);
    button.style.display = 'none';
    let chartConfig = {
      type: 'line',
      data: {
        labels: allPuzzleName,
        datasets: [],
      },
      options: {
        title: {
          display: true,
          text: 'results',
        },
        scales: {
          yAxec: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
    function generateRandomColor() {
      let color = '#';
      for (let i = 0; i < 3; i += 1) {
        const colorComponent = Math.floor(Math.random() * 255);
        color += colorComponent.toString(16);
      }
      return color;
    }
    const chart = new Chart(ctx, chartConfig);
    const addUser = (config, setName, chartdata) => {
      for (let i = 0; i < chartdata.length; i += 1) {
        let name = setName[i];
        let data = chartdata[i];
        let color = generateRandomColor();
        let newUser = {
          label: name,
          data: data,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 2,
          fill: false,
        }
        config.data.datasets.push(newUser);
      }
      chart.update();
    }
    addUser(chartConfig, allCheckName, allCheckData);
}