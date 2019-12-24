class Fetcher {
    constructor(data) {
        this.data = data || {};
    }
    fetchJson(url, dataKey) {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.data[dataKey] = res;
        })
    }
    getData(dataKey) {
        return this.data[dataKey];
    }
    test() {
        console.log('i work bitches');

    }
}

((window) => {
    const App = window.App || {};
    App.dataFetcher = new Fetcher();
    window.App = App;
})(window);

// export const fetcher = () => {
//     fetch('https://hamilsauce.github.io/trainStops.json')
//         .then(res => res.json())
//         .then(res => {
//             console.log(res);
//         })
// }
window.App.dataFetcher.test();

