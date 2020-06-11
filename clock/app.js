Vue.component('clock', {
  template: `<div>${msg}</div>`,
  props: {
    heroes: Array,
    columns: Array,
    filterKey: String
  },
  data() {
    return {
      msg: 'fuck me'
    }
  },
  computed: {
    hours() { return 'notta' }
  },
  filters: {},
  methods: {
    sortBy() {}
  }
});


var study = new Vue({
  el: "#vue-app",
  components: {
  	clock
  },
  data() {
    return {
      heading: "Vue.js",
      text: "No problem is so big that you can't run away from it."
    }
  }
})