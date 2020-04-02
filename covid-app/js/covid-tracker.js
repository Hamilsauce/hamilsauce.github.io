// import dataModule from "dataModule.js";
    // fetch("https://covid-193.p.rapidapi.com/history?country=usa", {


const covidFetch = () => {
    const outDiv = document.querySelector('.dataDisplay');
    var raw = "";
    var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
    };

    fetch("https://covidapi.info/api/v1/country/USA")
        .then(res => res.json())
        .then(data => {
            let [date, latestData] = Object.entries(data.result).pop();
            let latestDate = new Date(date).toLocaleDateString();

            // let covidData = JSON.stringify(latestData,  undefined, '\t')
            let covidData = formatDateData(latestData);

            document.querySelector('.inner.cover').classList.add('collapsed');
            setTimeout(() => {
                outDiv.innerHTML =
                `
                <h4>United States as of ${latestDate}</h4>
                ${covidData}
            `;
            document.querySelector('.dataDisplay').classList.add('show')
            }, 750);


            // document.querySelector('.inner.cover').style.height = '0px';

        })
        .catch(err => {
            console.log(err);
        });
}

const formatDateData = dateData => {
    const details = Object.entries(dateData)
        .map(([key, val]) => {
            let detail = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${Number(val).toLocaleString()} `

            return `<li>${detail}</li>`;
        }).reduce((acc, curr) => {
            let list = acc += curr;
            return list;
        });
    return `
        <ul class="detail-list">
            ${details}
        </ul>
    `;
}

document.querySelector('#submitButton')
    .addEventListener('click', e => {
        // convertData()
        covidFetch();

    })


    console.log('fuck');
