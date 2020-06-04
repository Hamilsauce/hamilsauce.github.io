// import Vue from 'vue';
// import { ContainerMixin, ElementMixin } from 'vue-slicksort';

const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list">
      <slot />
    </ul>
  `
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  template: `
    <li class="list-item">{{item}}</li>
  `
};

const ExampleVue = {
  name: 'Example',
  template: `
    <div class="app">
      <SortableList 
      	class="sortGrid" 
      	axis="xy" 
      	helperClass=".sortGrid"
      	
      	:transitionDuration="500"
      	v-model="items"
      >
        <SortableItem class="sortItem" v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
      </SortableList>
    </div>
  `,
  components: {
    SortableItem,
    SortableList
  },
  data() {
    return {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
    };
  }
};

const app = new Vue({
  el: '#app',
  render: h => h(ExampleVue)
});