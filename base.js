
// Creating a Vue Component for tabs.
// Essentially handles all parent/group behavior of tabbing.
Vue.component('tabs', {

  template: `
    <div>
      <div class="tabs">
        <ul>
          <li v-for="tab in tabs" :class="{ 'active': tab.isActive }">
            <a :href="tab.href" @click=selectTab(tab)>{{ tab.name }}</a>
          </li>
        </ul>
      </div>

      <div class="tab-details">
        <slot></slot>
      </div>
    </div>
  `,

  data() {
    return { tabs: [] };
  },

  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name);
      });
    }
  },

  created() {
    this.tabs = this.$children;
  },

  mounted() {
    console.log(this.$children);
  },

});


// Create a Vue Component for tab.
// Essentially handles all child/singlular behavior of tabbing.
Vue.component('tab', {

  template: `
    <div v-show="isActive"><slot></slot></div>
  `,

  data() {
    return { isActive: false }
  },

  props: {
    name: {required: true },
    selected: { default: false },
  },

  mounted() {
    this.isActive = this.selected;
  },

  computed: {
    href() {
      return '#' + this.name.toLowerCase().replace(/ /g, '-');
    }
  },

});


// Create new Vue to do things, generically called "app".
// Name doesn't matter in this instance. More just an example of being able to name it what you want.
var app = new Vue({

  // Lives in #root element.
  el: '#root',

  // The data it starts with.
  data: {
    message: 'Hello World',
    newName: '',
    names: ['Joe', 'Mary', 'Jane', 'Jack'],
    title: 'Now the title is being set through VueJS.',
    tasks: [
      { description: 'Go to the store', completed: true },
      { description: 'Finish vue tutorials', completed: false },
      { description: 'Take a nap', completed: false },
      { description: 'Clear inbox', completed: true },
    ],
    methodName: "methodName",
    propertyName: "propertyName",
    dataName: "dataName",
    eventName: "eventName",
  },

  // Methods to use.
  methods: {
    // Old syntax for browser compatability:
    // addname: function () {
    addName() {
      this.names.push(this.newName);
      this.newName = '';
    }
  },

  // Needs calculation before being rendered.
  computed: {
    incompleteTasks() {
      return this.tasks.filter(task => ! task.completed);
    }
  }
});
