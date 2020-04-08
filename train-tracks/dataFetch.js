export class DataStore { //* fetches json and stores it as a property in data object property
  constructor(data) {
    this.data = data || {},
      this.trainDataUrl = { //! object for holding/organizing random query string parts
        baseUrl: 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx',
        apiKey: '3106a8d27f8b4f8fb99b7c8d895163dd',
        mapId: '',
        stpId: '',
        outputType: 'JSON',
      }
  }
  constructUrl(proxy) {
    const queryString =
      `${proxy}${this.trainDataUrl.baseUrl}?key=${this.trainDataUrl.apiKey}&mapid=${this.trainDataUrl.mapId}&outputType=${this.trainDataUrl.outputType}`;
    return queryString;
  }
  getStoredData(dataKey) {
    return this.data[dataKey];
  }
  test() {
    console.log('i work bitches');
  }
  fetchTrainStops(url, dataKey) {
    if (localStorage.getItem(dataKey)) {
      this.data[dataKey] = JSON.parse(localStorage.getItem(dataKey));
    } else {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.data[dataKey] = res; //* dataKey is defined by user when calling method
          localStorage.setItem(dataKey, JSON.stringify(this.data[dataKey]));
        });
    }
  }
}

{DataStore}