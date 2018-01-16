// components/float-tab/float-tab.js
Component({
  properties: {
    items: {
      type: Array,
      value: [],
    },
    fixedBar: {
      type: Boolean,
      value: false,
      observer: "onScroll"
    }
  },

  data: {
    showFixedBar: false
  },

  methods: {
    onTabItemClick(e) {
      this.triggerEvent('tabclick', { id: e.currentTarget.dataset.tabs.id });
    },
    onScroll() {
      this.setData({
        showFixedBar: this.data.fixedBar
      });
    }
  }
})
