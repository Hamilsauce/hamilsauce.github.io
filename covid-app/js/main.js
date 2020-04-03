// import dataModule from "dataModule.js";
    // fetch("https://covid-193.p.rapidapi.com/history?country=usa", {


const covidFetch = () => {
    const outDiv = document.querySelector('.dataDisplay');
    let requestOptions = {
        method: 'GET',
        body: '',
        redirect: 'follow'
    };

    fetch("https://covidapi.info/api/v1/country/USA")
        .then(res => res.json())
        .then(data => {
            let [date, detaills] = Object.entries(data.result).pop();
            let [year, month, day] = date.split("-");

            let latestDate = new Date(`${month}/${day}/${year}`).toLocaleDateString();
            let covidData = formatDateData(detaills);

            document.querySelector('.inner.cover').classList.add('collapsed');
            setTimeout(() => {
                outDiv.innerHTML = `
                    <h2>United States</h2>
                    <h6 class="detail-date">${latestDate}</h6>
                    ${covidData}
                `;
            document.querySelector('.dataDisplay').classList.add('show')
            }, 750);
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