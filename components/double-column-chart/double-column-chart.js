'use strict';

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

    data: {
        columnChart: null
    },

    detached: function detached() {
        this.data.columnChart = null;
    },

    methods: {
        onItemsChange: function onItemsChange() {
            this.setData({
                canvasData: this.data.canvasData
            });
            if (this.data.columnChart == null || this.data.columnChart == undefined) {
                this.data.columnChart = new chart(this.data.canvasData, this);
            } else {
                this.data.columnChart.updateData(this.data.canvasData);
            }
        },
        onTitleChange: function onTitleChange() {
            this.setData({
                title: this.data.title
            });
        },
        onUnitChange: function onUnitChange() {
            this.setData({
                units: this.data.units
            });
        },
        onTouchHandler: function onTouchHandler(e) {
            if (this.data.columnChart != null) {
                this.data.columnChart.touchstart(e);
            }
            // console.log('onTouchHandler1');
        },
        onTouchMoveHandler: function onTouchMoveHandler(e) {
            if (this.data.columnChart != null) {
                this.data.columnChart.touchmove(e);
            }
            // console.log('onTouchMoveHandler1');
        },
        onTouchEndHandler: function onTouchEndHandler(e) {
            if (this.data.columnChart != null) {
                this.data.columnChart.touchend(e);
            }
            // console.log('onTouchEndHandler1');
        }
    }

});