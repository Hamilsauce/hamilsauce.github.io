
import {
    csvToJson
} from './csvToJson12.21.js'
import * as fetchman from './dataFetch.js'

// get stop data to populate select optuons
// const blueStops = csvToJson(blueLineStops, 'comma');
App.dataFetcher.fetchJson('https://hamilsauce.github.io/trainStops.json', 'allTrainStops');

let allStops = [];
const timerTest = () => {
    setTimeout(() => {
        let stops = App.dataFetcher.getData('allTrainStops');
        App.dataFetcher.getData('allTrainStops')

        allStops = stops.stops;
        sortAndAddStops(allStops);
    }, 5000)

}
timerTest();


const sortAndAddStops = (stopList) => {
    const stopSelect = document.querySelector('.stopSelect');

    stopList.sort((a, b) => {
        let first = a.stopName.toUpperCase();
        let second = b.stopName.toUpperCase();
        let compare = 0;

        if (first > second) compare = 1;
        else if (first < second) compare = -1;
        return compare;
    });
    console.log(stopList);

    stopList.forEach(stop => {
        // let [stopName, mapId] = Object.values(stop);
        const newOption = document.createElement('option');

        newOption.classList.add('stopOption');
        newOption.textContent = stop.STATION_DESCRIPTIVE_NAME;
        newOption.value = stop.mapId;
        stopSelect.appendChild(newOption);
    });
};

/*//! object for holding/organizing random query string parts */
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
    console.log(trainData);

    let stationEtas = Object.values(trainData)[0].eta
    return stationEtas;
}
/**!
 * !makes the request for train data, calls above function to access data */
const getTrainData = () => {
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
            etas.forEach(eta => {
                let time = new Date(JSON.stringify(eta.arrT).slice(1, eta.arrT.length + 1));
                let isApproaching = JSON.stringify(eta.isApp).slice(1, eta.isApp.length + 1) === '1' ? 'Due' : '';
                document.querySelector('.preformat0' + i).innerHTML = JSON.stringify(eta.staNm).slice(1, eta.staNm.length + 1);
                document.querySelector('.preformat1' + i).innerHTML = `${JSON.stringify(eta.stpDe).slice(1, eta.stpDe.length + 1)}`;
                document.querySelector('.preformat2' + i).innerHTML = isApproaching;
                document.querySelector('.preformat3' + i).innerHTML = `<b>ETA:</b> ${time.toLocaleTimeString()}`;
                i++;

            })
            document.querySelectorAll('.eta').forEach(div => {

                if (div.textContent) {
                    div.style.display = 'grid';
                }

            });
        })
        .catch(err => {
            console.log(err);
        });

    return ctaData;
}


document.querySelector('.stopSelect').addEventListener('change', e => {
    console.log(e.target.value)
    console.log(document.querySelector('.stopSelect').value);
    queryString.mapId = e.target.value;
    let etaData = (getTrainData());

})
const filterByLine = (e) => {
    const boxes = document.querySelectorAll('.trainCheckbox');
    let filteredStops = [];
    boxes.forEach(box => {


        if (box.checked) {
            let lineName = box.value;
            console.log(lineName);

            filteredStops = allStops
                .filter(stop => {
                    return stop[lineName] === true;
                });
        }
        if (filteredStops.length === 0) {
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