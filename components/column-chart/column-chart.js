var chart = require('chart.js');
Component({
  properties: {
    canvasData: {
      type: Object,
      value: {},
      observer: "onItemsChange"
    },
    title: {
      type: String,
      value: '',
      observer: "onTitleChange"
    },
    unit: {
      type: String,
      value: '',
      observer: "onUnitChange"
    }
  },

  data: {
    columnChart: null,
  },

  detached: function () {
    this.data.columnChart = null;
  },

  methods: {
    onItemsChange() {
      this.setData({
        canvasData: this.data.canvasData
      });
      if (this.data.columnChart == null || this.data.columnChart == undefined) {
        this.data.columnChart = new chart(this.data.canvasData, this);
      } else {
        this.data.columnChart.updateData(this.data.canvasData);
      }
    },
    onTitleChange() {
      this.setData({
        title: this.data.title,
      });

    },
    onUnitChange() {
      this.setData({
        unit: this.data.unit
      });
    },
    onTouchHandler(e) {
      if (this.data.columnChart != null) {
        this.data.columnChart.scrollStart(e);
      }
      // console.log('onTouchHandler1');
    },
    onTouchMoveHandler(e) {
      if (this.data.columnChart != null) {
        this.data.columnChart.scroll(e);
      }
      // console.log('onTouchMoveHandler1');
    },
    onTouchEndHandler(e) {
      if (this.data.columnChart != null) {
        this.data.columnChart.scrollEnd(e);
      }
      // console.log('onTouchEndHandler1');
    },
  }

});