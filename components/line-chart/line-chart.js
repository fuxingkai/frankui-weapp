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
    units: {
      type: Array,
      value: [],
      observer: "onUnitChange"
    }
  },


  data: { lineChart: null, },

  detached: function () {
    this.data.lineChart = null;
    // this.setData({
    //   canvasData: null,
    // });
  },


  methods: {
    onItemsChange() {
      this.setData({
        canvasData: this.data.canvasData
      });
      if (this.data.lineChart == null || this.data.lineChart == undefined) {
        this.data.lineChart = new chart(this.data.canvasData, this);
      } else {
        this.data.lineChart.updateData(this.data.canvasData);
      }
    },
    onTitleChange() {
      this.setData({
        title: this.data.title,
      });

    },
    onUnitChange() {
      this.setData({
        units: this.data.units
      });
    },
    onTouchHandler(e) {
      if (this.data.lineChart != null) {
        this.data.lineChart.touchstart(e);
      }
      // console.log('onTouchHandler1');
    },
    onTouchMoveHandler(e) {
      if (this.data.lineChart != null) {
        this.data.lineChart.touchmove(e);
      }
      // console.log('onTouchMoveHandler1');
    },
    onTouchEndHandler(e) {
      if (this.data.lineChart != null) {
        this.data.lineChart.touchend(e);
      }
      // console.log('onTouchEndHandler1');
    },
  }

});