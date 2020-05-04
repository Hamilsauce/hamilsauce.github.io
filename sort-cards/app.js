// import Vue from './src/vue.js';
// import * as cards from './cards.js';


Vue.component('box', {
  name: 'box',
  template: "#card-template",
  props: {
    card: Object,
    firstCard: Object
  },
  data() {
    return {
      id: this.card.id,
      isSelected: false,
      isFirst: false,
      styleObject: {
        background: this.card.color
      },
      // firstId: this.firstCard.id
    }
  },
  methods: {
    handleClick() {
      this.$emit('cardSelected', this.card.id)
      if (this.firstId == this.id) this.isFirst
      this.isSelected = !this.isSelected;
      setTimeout(() => {
        // console.log(this.id, this.firstCard.id);
        this.isSelected = !this.isSelected;

      }, 400)
    },
    toggleSelected() {
      this.active = !this.active;
      // console.log(this.active);

    }
  },
  computed: {
    cardName() {
      setTimeout(() => {
        // console.log(`c${this.card.id}`);
        return `c${this.card.id}`

      }, 1000)
    }
    // isFirst() {
    // console.log(`c${this.card.id}`);
    //     if (this.id == this.firstCard.id) {
    //       console.log('isfirst');
    //       return true;
    //     } else {
    //       return false
    //     }
    //   }
  },
  watch: {
    firstCard: function (val) {
      console.log('watcget')
      console.log(val)
    }
    //  // this.$emit('cardSelected', this.card)

    //  } else {
    //    this.$emit('cardDeselected', this.card)


  },
  mounted() {

  }
})

Vue.component('grid', {
  name: 'grid',
  template: 'grid-template',
  props: {
    cards: Array
  },
  data() {
    return {
      selectedCard: ''
    }
  }
})



new Vue({
  el: "#v-app",
  data() {
    return {
      text: "Balls",
      cards: [{
          id: 0,
          color: "blue"
        },
        {
          id: 1,
          color: "red"
        },
        {
          id: 2,
          color: "teal"
        },
        {
          id: 3,
          color: "yellow"
        },
        {
          id: 4,
          color: "brown"
        },
        {
          id: 5,
          color: "orange"
        },
        {
          id: 6,
          color: "purple"
        },
        {
          id: 7,
          color: "green"
        },
        {
          id: 8,
          color: "pink"
        }
      ]
    }
  },
  methods: {
    handleSelection(e) {
      let cardId = e.target.textContent
      // console.log(cardId);
      let selectedIndex = this.cards.findIndex(card => card.id == cardId)
      // console.log('selectedIn');
      // console.log(selectedIndex);

      let currentFirst = this.cards[0]
      this.firstCard = currentFirst;
      console.log('axtuve carda');
      console.log(this.firstCard);
      //  currentFirst //.splice(0, 1)[0]
      let card = this.cards[selectedIndex] //.splice(selectedIndex, 1)[0]
      // /  	console.log('splucez');
      // console.log(card);
      setTimeout(() => {
        this.cards.splice([selectedIndex], 1, currentFirst) //= currentFirst
        // this.activeCard = cardId;
        this.cards.splice(0, 1, card) //= currentFirst



        // this.cards.unshift(card)
      }, 400)
    },
    cardSelected(id) {
      //   this.active = !this.active;
      console.log('card selected fired');
      console.log(id);

    }
  },
  computed: {
    firstCard() {

      return this.cards[0]
    }

  },
  watch: {
    id: function (newId, oldId) {
      let oldCard = this.cards[oldId];


    },
    mounted() {
      this.$on('cardSelected', card => {
        console.log('mounted func runs');
        this.handleSelection(card);
      })
    }
  }
})



/*
  fetch(`./boxes.json`)
    .then(response => response.text())
    .then(data => {
      this.cards = data;
      console.log(this.cards);
    })
*/