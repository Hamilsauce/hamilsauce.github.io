import {blueLineStops} from './ctaBlueStops.js'
import {csvToJson} from '../csvToJson12.21.js'

// get stop data to populate select optuons
const blueStops = csvToJson(blueLineStops, 'comma');

(() => {
    const populateStopSelect = data => {
        const stopSelect = document.querySelector('.stopSelect');

        data.forEach(stop => {
            let [stopName, mapid] = Object.values(stop);

            const newOption = document.createElement('option');
            newOption.classList.add('stopOption');
            newOption.textContent = stopName;
            newOption.value = mapid;

            stopSelect.appendChild(newOption);
        });
    }
    return populateStopSelect(blueStops);
})();

/**!
 * !object for holding/organizing random query string parts */
let queryString = {
    trainUrl: 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx',
    apiKey: '3106a8d27f8b4f8fb99b7c8d895163dd',
    mapid: '41020',
    outputType: 'JSON',
    constructString(proxy) {
        const queryString = `${proxy}${this.trainUrl}?key=${this.apiKey}&mapid=${this.mapid}&outputType=${this.outputType}`;
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
    queryString.mapid = e.target.value;
        let trainData = getTrainData();
        let etaData = (getTrainData());

})
//event handle for get data button
// document.querySelector('.submitButton')
//     .addEventListener('click', e => {
//         e.preventDefault();

//         let trainData = getTrainData();
//         let etaData = (getTrainData());

//     })