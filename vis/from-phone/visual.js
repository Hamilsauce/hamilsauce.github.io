class Chart {
  constructor(chart, columns) {
    this.chart = chart,
      this.columns = columns,
      this.data = data || {},
      this.chartHeight = '500px'
  }
  setColumn(columnName) {
    this.columns.push()
  }
  setChartHeight() {
    let highestValue = this.columns.sort((a, b) => {
      return a.confirmed > b.confirmed;
    })
    console.log();

  }
}
const chartBody = document.querySelector('.grid');
const chart = document.getElementById('chart');

let globalData = {};
globalData.totalConfirmed = parseInt(3755341);
// let chartScale = 6000;
// let chartY = globalData.totalConfirmed / chartScale

fetch('https://covidapi.info/api/v1/global/latest')
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

let options = []
fetch('https://hamilsauce.github.io/covid-tracker/data/isocodes.json')
  .then(res => res.json())
  .then(data => {
    let codeList = data;
    options = codeList;
    setTimeout(() => {
      document.querySelectorAll('.column')
        .forEach(name => {
          colNameEvents(options, name)
        })
    }, 1500);
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

const mapDataToColumn = (code, column) => {
  const graph = document.querySelector('.grid');
  let colVal = column.querySelector('.column-value');
  let chartY = 600;

  let confirmedCases = globalData[code].confirmed || 0;
  setTimeout(() => {
    colHeight = `${((confirmedCases / 75) * 100  ) / chartY }px`
    console.log(colHeight);
    column.style.height = colHeight
    colVal.textContent = Number(confirmedCases).toLocaleString()
  }, 1000);
}

const colNameEvents = (options, column) => {
  makeDataList(options, column)
  let listInput = column.querySelector('.listInput')
  listInput.addEventListener('click', e => {
    e.target.value = '';
    e.target.focus();
  })


  listInput.addEventListener('change', e => {
    let ctryName = listInput.value.trim().toUpperCase()
    let codeEntry = options.filter(item => {
      return item.COUNTRY.trim().toUpperCase() == ctryName
    })
    let iso = codeEntry[0].CODE
    mapDataToColumn(iso, column)
  })
}

const makeDataList = (options, newParent) => {
  let listInput = document.createElement('input')
  listInput.setAttribute("list", "codes");
  listInput.classList.add('listInput')

  let list = document.createElement('DATALIST')
  list.setAttribute("id", "codes");

  options.forEach(item => {
    let opt = document.createElement('option')
    opt.setAttribute("value", item.COUNTRY);
    opt.classList.add('code-option')
    opt.dataset.code = item.CODE;
    list.appendChild(opt)
  })
  newParent.appendChild(listInput)
  newParent.appendChild(list)
}