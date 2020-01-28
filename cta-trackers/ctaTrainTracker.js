import * as fetchman from './dataFetch.js'

App.dataFetcher.fetchJson(
  'https://hamilsauce.github.io/cta-trackers/trainStops.json', 'allTrainStops'); //! Gets a stop list from json file for select drop down
document.querySelector('.data-display').style.display = 'none';
let allStops = [];
const delayedData = () => {
  setTimeout(() => {
    let stops = App.dataFetcher.getData('allTrainStops');
    App.dataFetcher.getData('allTrainStops')

    allStops = stops.stops;
    sortAndAddStops(allStops);
    document.querySelector('.dimmer').style.display = 'none';
  }, 4000)
}
delayedData();

const sortAndAddStops = (stopList) => { //! sorts stops fetched from json, then adds them as options to seelct
  const stopSelect = document.querySelector('.stopSelect');

  stopList.sort((a, b) => {
      let first = a.stopName.toUpperCase();
      let second = b.stopName.toUpperCase();
      let compare = 0;

      if (first > second) compare = 1;
      else if (first < second) compare = -1;
      return compare;
    })
    .forEach(stop => {
      const newOption = document.createElement('option');

      newOption.classList.add('stopOption');
      newOption.textContent = stop.stopName;
      newOption.value = stop.mapId;
      stopSelect.appendChild(newOption);
    });
};

/*//! object for holding/organizing random query string parts */
// TODO Need to move this into dataFetch/dataFetcher
let queryString = {
  trainUrl: 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx',
  apiKey: '3106a8d27f8b4f8fb99b7c8d895163dd',
  mapId: '41020',
  outputType: 'JSON',
  constructString(proxy) {
    const queryString = `${proxy}${this.trainUrl}?key=${this.apiKey}&mapid=${this.mapId}&outputType=${this.outputType}`;
    return queryString;
  }
}

const getArrivalData = trainData => {
  let stationEtas = Object.values(trainData)[0].eta
  return stationEtas;
}
/**
 // TODO Need to move this into dataFetch/dataFetcher */
const getTrainData = () => { //!makes the request for train data, calls above function to access data
  let ctaData;
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const ctaTrainUrl = queryString.constructString(proxy);

  fetch(ctaTrainUrl)
    .then(response => response.json())
    .then(data => {
      ctaData = data;
      let time = new Date();
      let etas = getArrivalData(ctaData);
      let i = 0;
      etas.sort((a, b) => {
       if (a.destNm < b.destNm) {
     return -1;
   }
   if (a.destNm > b.destNm) {
     return 1;
   }
   
   // names must be equal
   return 0;
   }) 
      etas.forEach(eta => {
        let time = new Date(JSON.stringify(eta.arrT).slice(1, eta.arrT.length + 1));
        let isApproaching = JSON.stringify(eta.isApp).slice(1, eta.isApp.length + 1) === '1' ? 'Due' : '';
        document.querySelector('.preformat0' + i).innerHTML = JSON.stringify(eta.staNm).slice(1, eta.staNm.length + 1);
        document.querySelector('.preformat2' + i).innerHTML = `ETA: ${time.toLocaleTimeString()}`;
        document.querySelector('.preformat1' + i).innerHTML = `${JSON.stringify(eta.destNm).slice(1, eta.destNm.length + 1).replace('Service ', '')}`;
        document.querySelector('.preformat3' + i).innerHTML = `<span class="approaching">${isApproaching}</span>`;
        i++;
      })
      // document.querySelectorAll('.eta').forEach(div => {
      //   if (div.textContent) {
      //     div.style.display = 'grid';
      //   }
      // });
    })
    .catch(err => {
      console.log(err);
    });
  return ctaData;
}

document.querySelector('.stopSelect')
  .addEventListener('change', e => {
    document.querySelector('.data-display').style.display = 'grid';
    queryString.mapId = e.target.value;
    let etaData = (getTrainData());
    toggleCollapse(e)
  })

const filterByLine = (e) => { //! filters select options by train line checkboxes
  const boxes = document.querySelectorAll('.trainCheckbox');
  let filteredStops = [];
  boxes.forEach(box => {
    if (box.checked) {
      let lineName = box.value;

      filteredStops = allStops
        .filter(stop => {
          return stop[lineName] === true;
        });
    }
    if (filteredStops.length === 0) { //! if no results, show all results
      filteredStops = allStops;
    }

  });
  return filteredStops;
}
document.querySelector('.trainLineBoxes').addEventListener('click', e => {
  document.querySelectorAll('.stopOption').forEach(opt => {
    opt.remove()
  });

  let filteredList = filterByLine();
  sortAndAddStops(filteredList);

})

document.querySelector('.checkBoxesLabel').addEventListener('click', e => {
  toggleCollapse(e);
})

const toggleCollapse = e => {
  const filters = document.querySelector('.trainLineBoxes');
  const collapseLabel = document.querySelector('.collapse');
  let labelText = '';
 
  if (e.target.classList.contains('filterlabel')) {
    filters.classList.toggle('trainsLineBoxes-collapsed');
  } else if (e.target.classList.contains('stopSelect')) {
    filters.classList.add('trainsLineBoxes-collapsed');
  }

  if (filters.classList.contains('trainsLineBoxes-collapsed')) {
    labelText = 'Click to expand';
  } else {
    labelText = 'Click to collapse';
  }
  collapseLabel.textContent = labelText;
}