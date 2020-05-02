// Vue.component('PolItem', {
//   name: "PolItem",
//   // template: `<li class="polItem" data-cid="${candidate.cid}">${candidate.cand_name}</li>`,
//   props: {
//     candidate: Object
//   },
//   data() {
//     return {
//       isSelected: false
//     }
//   },
//   methods: {
//     handleClick() {
//       this.isSelected = true;
//       this.$emit('selected:candidate', candidate.cid)
//     }
//   },
//   computed: {}
// })

Vue.component('IndustryList', {
  name: "IndustryList",
  template: '#industry-template',
  props: {
    canInd: Object
  },
  data() {
    return {
      isSelected: false
    }
  },
  methods: {
    handleClick() {
      this.isSelected = true;
      this.$emit('selected:candidate', candidate.cid)
    }
  },
  computed: {}
})


Vue.component('filterlist', {
  name: "filterlist",
  template: '#list-template',
  components: {
    // PolItem
  },
  props: {
    dataset: Object,
    selectedCountry: undefined,
    cardDataReady: Boolean
  },
  data() {
    return {}
  },
  methods: {
    peek(obj) {
      console.log(this.dataset);
    }
  },
  computed: {
    countryName() {
      return this.dataset.countryName;
    },
    date() {
      return this.dataset.date;
    },
    confirmed() {
      return this.dataset.confirmed;
    },
    deaths() {
      return this.dataset.deaths;
    },
    recovered() {
      return this.dataset.recovered;
    },
  },
  filters: {
    capitalize(text) {
      let newText = `${text.slice(0, 1).toUpperCase()}${text.slice(1).toLowerCase()}`
      return newText;
    }
  }

});

// import { canInd } from './data/canInd-model.js'
new Vue({
  el: "#app",
  components: {
    // IndustryList
  },
  data: function() {
    return {
      heading: 'Dynamic sortable table',
      gridColumns: ['markerName', 'markerSlug'],
      industryResult: Array
    }
  },
  methods: {
    showData() {
      console.log(this.candInd)
    },
    fetchCands(url) {
      fetch(url)
        .then(res => res.json())
        .then(result => {
          const data = result.response.industries;
          this.industryResult = data;
        })
    }
  },
  mounted() {
    this.showData();
  },

  computed: {
    canInd() {
      if (this.industryResult) {
      const name = Object.values(this.industryResult)[0].cand_name;
      console.log(Object.values(this.industryResult)[0].cand_name);
      const fixedInds = inds
        .map(ind => {
          return Object.values(ind)[0]
        });
      fixedInds.candidateName = name;
      return fixedIns;
      }
    }
  },
  created() {
this.fetchCands('https://www.opensecrets.org/api/?method=candIndustry&cid=N00007360&cycle=2020&apikey=f7f0d2ef3a3a39bf0816523af406df39&output=json')
  }

  //   filterObjProps() {
  //     const keepList = [
  //     'lat',
  //     'id',
  //     'lng',
  //     'markerName',
  //     'markerSlug',
  //     'wikiPag'
  //   ];
  //     const newArrayOfFilteredObjs = arrayOfObjs
  //       .map(Obj => {
  //         let id = arrayOfObjs.indexOf(Obj);
  //         Obj.id = id;

  //         let newFilteredObj = Object.entries(Obj)
  //           .filter(([prop, val]) => {
  //             if (keepList.includes(prop) === true) {
  //               console.log([prop, val]);
  //               return [prop, val];
  //             }
  //           }).reduce((newObj, item) => {
  //             newObj[item[0]] = item[1];
  //             return newObj;
  //           }, {});
  //         console.log(slimSeed);
  //         return slimSeed;
  //       });
  //     return slimSeeds;
  //   }
  // }
});