// import koroks from './koroks.js'

// register the grid component
Vue.component('demo-grid', {
 template: '#grid-template',
 props: {
  heroes: Array,
  columns: Array,
  filterKey: String
 },
 data: function() {
  let sortOrders = {}
  this.columns.forEach(function(key) {
   sortOrders[key] = 1;
  })
  return {
   sortKey: '',
   sortOrders: sortOrders,
   searchQuery: ''
  }
 },
 computed: {
  filteredHeroes: function() {
   let sortKey = this.sortKey
   let filterKey = this.filterKey && this.filterKey.toLowerCase()
   let order = this.sortOrders[sortKey] || 1
   let heroes = this.heroes
   if (filterKey) {
    heroes = heroes.filter(function(row) {
     return Object.keys(row).some(function(key) {
      return String(row[key]).toLowerCase().indexOf(filterKey) > -1
     })
    })
   }
   if (sortKey) {
    heroes = heroes.slice().sort(function(a, b) {
     a = a[sortKey]
     b = b[sortKey]
     return (a === b ? 0 : a > b ? 1 : -1) * order
    })
   }
   return heroes
  }
 },
 filters: {
  capitalize: function(str) {
   return str.charAt(0).toUpperCase() + str.slice(1)
  }
 },
 methods: {
  sortBy: function(key) {
   this.sortKey = key
   this.sortOrders[key] = this.sortOrders[key] * -1
  }
 }
});

const demo = new Vue({
   el: "#vue-app",
   data: function() {
    return {
     heading: 'Dynamic sortable table',
     gridColumns: ['markerName','markerSlug'],
     
     gridData: koroks,
     
     //  { name: 'Chuck Norris', power: Infinity },
     //  { name: 'Bruce Lee', power: 9000 },
     //  { name: 'Jackie Chan', power: 7000 },
     //  { name: 'Jet Li', power: 8000 }
     //  ],
     searchQuery: ''
    }
   },
   computed: {
    korokCount() {
     return koroks.length;
    },
    slimTheSeeds() {
     const keepList = [
       'lat',
       'id',
       'lng',
       'markerName',
       'markerSlug',
       'wikiPag'
     ];
     const slimSeeds = koroks
      .map(korok => {
       let id = koroks.indexOf(korok);
       korok.id = id;

       let slimSeed = Object.entries(korok)
        .filter(([prop, val]) => {
         if (keepList.includes(prop) === true) {
      console.log([prop, val]);
          return [prop, val];
         }
        }).reduce((obj, item) => {
         obj[item[0]] = item[1];
         return obj;
        }, {});
      console.log(slimSeed);
       return slimSeed;
      });
      
      console.log('slimSeeds');
      console.log(slimSeeds);
     return slimSeeds;
    }
   }
});