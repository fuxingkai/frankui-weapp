var chart = require('chart.js');
var columnChart = null;
Component({
    properties: {
        canvasData: {
            type: Object,
            value: {},
            observer: "onItemsChange"
        },
    },

    data: {},

    detached: function () { 
      columnChart = null;
      this.setData({
        canvasData: null,
      });
    },

    methods: {
        onItemsChange() {
            this.setData({
                canvasData: this.data.canvasData
            });
            if (columnChart == null || columnChart == undefined) {
                columnChart = new chart(this.data.canvasData, this);
            } else {
                columnChart.updateData(this.data.canvasData);
            }
        },
        onTouchHandler(e) {
            if (columnChart != null) {
                columnChart.scrollStart(e);
            }
            console.log('onTouchHandler1');
        },
        onTouchMoveHandler(e) {
            if (columnChart != null) {
                columnChart.scroll(e);
            }
            console.log('onTouchMoveHandler1');
        },
        onTouchEndHandler(e) {
            if (columnChart != null) {
                columnChart.scrollEnd(e);
            }
            console.log('onTouchEndHandler1');
        },
    }

});