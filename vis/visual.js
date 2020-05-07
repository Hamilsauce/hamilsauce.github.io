class Chart {
  constructor(chart, columns) {
    this.chart = chart,
      this.columns = columns,
      this.data = data || {}
  }
  setColumn(columnName) {
    this.columns.push()
  }
}
const chartBody = document.querySelector('.grid');
const chart = document.getElementById('chart');

console.log(chart.children);
console.log(chart);

let globalData = {};
globalData.totalConfirmed = parseInt(3755341);
// let chartScale = 6000;
// let chartY = globalData.totalConfirmed / chartScale

fetch('./globalLatest.json')
  .then(res => res.json())
  .then(data => {
    globalData = Object.values(data.result)
      .map(val => {
        return Object.entries(val)[0]
      })
      .reduce((obj, [key, props]) => {
        let entries = Object.entries(props)
        obj[key] = props;
        return obj
      }, {});

  })

const initialize = () => {
  const graph = document.querySelector('.grid');
  const columns = graph.querySelectorAll('.column');
  columns.forEach(column => {
    column.style.height = `0px`;
  })
  // graph.style.height = chartY;
}
initialize();

const mapDataToColumn = (colName, column) => {
  const graph = document.querySelector('.grid');
  let colVal = column.querySelector('.column-value');
  let chartY = 600;

  let name = colName.textContent.trim().toUpperCase()
  let confirmedCases = globalData[name].confirmed || 0;
  setTimeout(() => {
    colHeight = `${((confirmedCases / 2000) * 100  ) / chartY }%`
    console.log(colHeight);
    column.style.height = colHeight
    colVal.textContent = Number(confirmedCases).toLocaleString()
  }, 1000);
}

const colNameEvents = () => {
  document.querySelectorAll('.column-name')
    .forEach(columnName => {
      columnName.addEventListener('click', e => {
        columnName.contentEditable = 'true';
      })
      columnName.addEventListener('keyup', e => {
        setTimeout(() => {
          mapDataToColumn(columnName, columnName.parentNode)
        }, 1000);
      })
    })
}

colNameEvents()