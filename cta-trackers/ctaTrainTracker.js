import * as fetchman from './dataFetch.js'
import {
  Favorites
} from './faves.js'

let allStops = [];
const faves = new Favorites();

// TODO Need to move this into dataFetch/dataFetcher
let trainDataUrl = { //! object for holding/organizing random query string parts
  baseUrl: 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx',
  apiKey: '3106a8d27f8b4f8fb99b7c8d895163dd',
  mapId: '41020',
  outputType: 'JSON',
  constructUrl(proxy) {
    const queryString =
      `${proxy}${this.baseUrl}?key=${this.apiKey}&mapid=${this.mapId}&outputType=${this.outputType}`;
    return queryString;
  }
}

App.dataFetcher.fetchJson( //! Gets a stop list from json file for select drop down
  'https://hamilsauce.github.io/cta-trackers/trainStops.json', 'allTrainStops');



const buildStopList = (stopList) => { //! sorts stops fetched from json, then adds them as options to seelct
  const stopSelect = document.querySelector('.stopSelect');
  document.querySelectorAll('.stopOption').forEach(opt => { //! remove each option from select box
    opt.remove()
  })

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

const calculateETA = (timeOfPrediction, predictedETA) => {
  let predTime = new Date(timeOfPrediction);
  let arrTime = new Date(predictedETA);

  let timeDiff = (arrTime - predTime);
  let minDiff = Math.round((timeDiff / 1000) / 60);
  return minDiff;
}

// TODO Need to move this into dataFetch/dataFetcher */
const getTrainData = () => { //!makes the request for train data, calls above function to access data
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const ctaTrainUrl = trainDataUrl.constructUrl(proxy);
  let i = 0;
  fetch(ctaTrainUrl)
    .then(response => response.json())
    .then(data => {
      let etas = Object.values(data)[0].eta

      etas.sort((a, b) => {
        if (a.destNm < b.destNm) {
          return -1;
        } else if (a.destNm > b.destNm) {
          return 1;
        } else {
          return 0;
        }
      }).forEach(eta => {
        renderArrivals(eta, i);
        console.log(i);
        i++;
      })
      console.log(etas);

    })
    .catch(err => {
      console.log(err);
    });
}

//@ UI state and functions

const renderArrivals = (eta, incrementer) => {
  calculateETA(eta.prdt, eta.arrT)
  let isApproaching = parseInt(eta.isApp) === 1 ? 'Due' : '';

  document.querySelector('.preformat0' + incrementer).innerHTML = `<span>${eta.staNm}</span>`;
  document.querySelector('.preformat1' + incrementer).innerHTML = `to ${eta.destNm.replace('Service ', '')}`;
  document.querySelector('.preformat2' + incrementer).innerHTML =
    `<span class="arriving-label">Arrival: </span>
    <span class="time-div2">${calculateETA(eta.prdt, eta.arrT)} minutes</span>`;
  document.querySelector('.preformat3' + incrementer).innerHTML = `<span class="approaching">${isApproaching}</span>`;
}

const showActionBar = e => {
  if (faves.viewingFavorites === true) {
    hideActionBar();
    return
  }
  const actionBar = document.querySelector('.action-bar');
  actionBar.classList.remove('hide-action-bar');
  actionBar.classList.add('show-action-bar');
}
const hideActionBar = e => {
  const actionBar = document.querySelector('.action-bar');
  actionBar.classList.add('hide-action-bar');
  actionBar.classList.remove('show-action-bar');
}

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

//@ BEGIN Eventlisteners

document.querySelector('.stopSelect')
  .addEventListener('change', e => {
    document.querySelector('.data-display').style.display = 'grid';
    trainDataUrl.mapId = e.target.value;
    getTrainData();
    showActionBar();
    toggleCollapse(e)
  })

//* when a train line filter is clicked, rebuild select box
document.querySelector('.trainLineBoxes').addEventListener('click', e => {
  document.querySelectorAll('.stopOption').forEach(opt => { //! remove each option from select box
    opt.remove()
  });
  let filteredList = filterByLine(); //! get stop list filtered by each selected train line
  buildStopList(filteredList); //! re-render that bia
})

document.querySelector('.checkBoxesLabel').addEventListener('click', e => {
  toggleCollapse(e);
  if (document.querySelector('.trainLineBoxes').classList.contains('trainsLineBoxes-collapsed')) {
    showActionBar()
  } else {
    hideActionBar();
  }
})

document.querySelector('.add-fave-button').addEventListener('click', e => {
  //...for starters - get the current value of stopSelect
  const stopSelect = document.querySelector('.stopSelect');
  faves.addFavorite(parseInt(stopSelect.value));
  faves.storeFavorites();
});

document.querySelector('.view-fave-button').addEventListener('click', e => {
  const stopSelect = document.querySelector('.stopSelect');
  document.querySelectorAll('.stopOption').forEach(opt => { //! remove each option from select box
    opt.remove()
  });
  faves.viewingFavorites = true;
  hideActionBar();

  const faveList = allStops
    .filter(stp => {
      return faves.favorites.indexOf(stp.mapId) !== -1;
    })

  buildStopList(faveList);
  trainDataUrl.mapId = stopSelect.value;
  getTrainData();
});

document.querySelector('.clear-fave-button').addEventListener('click', e => {
  faves.clear();
  faves.viewingFavorites = false;
  showActionBar();
});

document.querySelector('.view-all-button').addEventListener('click', e => {
  buildStopList(allStops);
  getTrainData();
  faves.viewingFavorites = false;
  showActionBar();
});


//* Initialize selectbox and dimmer modal, initial hiding and showing of UI
(() => {
  document.querySelector('.data-display').style.display = 'none';
  document.querySelector('.action-bar').classList.add('show-action-bar');
  setTimeout(() => { //! delayed to allow for trainStops.json to fetch, then sets json to allStops variable
    let stops = App.dataFetcher.getStoredData('allTrainStops');

    allStops = stops.stops;
    buildStopList(allStops);
    document.querySelector('.dimmer').style.display = 'none';
  }, 4000)
})();