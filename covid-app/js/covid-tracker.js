// import dataModule from "dataModule.js";
    // fetch("https://covid-193.p.rapidapi.com/history?country=usa", {


const covidFetch = () => {
    const outDiv = document.querySelector('.dataDisplay');
    console.log('it happened');

    var raw = "";
    var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
    };

    fetch("https://covidapi.info/api/v1/country/USA/2020-03-15")
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let covidData = JSON.stringify(data,  undefined, '\t')
            outDiv.textContent = covidData;
        })
        .catch(err => {
            console.log(err);
        });
}



document.querySelector('#submitButton')
    .addEventListener('click', e => {
        // convertData()
        covidFetch()
    })


    console.log('fuck');
