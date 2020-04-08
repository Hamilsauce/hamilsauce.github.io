export class queryHandler {
    constructor() {

    }
}

const requester = {
    baseUrl: 'https://covidapi.info/api/v1/',
    scopeParam: `country`,
    countryParam: 'USA',
    timeseriesParam: 'timeseries',
    startDateParam: '2020-04-02',
    endDateParam: '2020-04-02',
    requestOptions = {
        method: 'GET',
        body: '',
        redirect: 'follow'
    },
    buildQueryString() {

    }

}

/*

/country/IND
/country/IND/latest
/country/IND/2020-03-15
/country/IND/timeseries/2020-03-15/2020-03-20


/global
/global/count
/global/latest
/global/2020-03-15
/global/2020-03-10/2020-03-15
/global/timeseries/2020-03-10/2020-03-19

/latest-date






Country specific historic data
Country specific data for a particular date
Latest Global Count
Global count on a particular date
Global count in a date range
Global Timeseries data in date range
Country specific time-series data
Date of last record entry for any country
Latest record for a country
Global date-wise count
Latest count for all countries
*/