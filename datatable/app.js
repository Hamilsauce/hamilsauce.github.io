// import koroks from './koroks.js'

// register the grid component
Vue.component('demo-grid', {
  template: '#grid-template',
  props: {
    heroes: Array,
    columns: Array,
    filterKey: String,
    dataSet: Object,
    dataReady: Boolean
  },
  data: function () {
    let sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
      searchQuery: '',
      selectedRow: ''
    }
  },
  watch: {
    dataSet: function (val) {
      this.dataRready = true
    }
  },
  computed: {
    newData() {
      console.log('inside new data');
      console.log(this.dataSet.confirmed);
      return this.dataSet;
    },
    filteredHeroes: function () {
      let sortKey = this.sortKey
      let filterKey = this.filterKey && this.filterKey.toLowerCase()
      let order = this.sortOrders[sortKey] || 1
      let heroes = this.heroes
      if (filterKey) {
        heroes = heroes.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        heroes = heroes.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return heroes
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
});

const demo = new Vue({
  el: "#vue-app",
  data: function () {
    return {
      heading: 'Dynamic sortable table',
      gridColumns: ['date', 'confirmed', 'deaths'],

      gridData: [],

      //  { name: 'Chuck Norris', power: Infinity },
      //  { name: 'Bruce Lee', power: 9000 },
      //  { name: 'Jackie Chan', power: 7000 },
      //  { name: 'Jet Li', power: 8000 }
      //  ],
      searchQuery: '',
      result: undefined,
      dataReady: false
    }
  },
  watch: {
    result: function (value) {
      let flatDates = Object.entries(value)
        .map(([date, details]) => {
          return [
              ['date', new Date(date).toLocaleDateString()]
            ]
            .concat(Object.entries(details))
            .reduce((obj, [prop, val]) => {
              obj[prop] = val;
              return obj;
            }, {});
        })
      this.gridData = flatDates;
      this.dataReady = true;
    }
  },
  computed: {
  },
  methods: {
    async fetchData() {
      await fetch('https://covidapi.info/api/v1/country/USA')
        .then(res => res.json())
        .then(data => {
          this.result = data.result;
          console.log(this.result);
        })
    }
  },
  mounted() {
    this.fetchData();
  }
});