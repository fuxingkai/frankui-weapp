'use strict';

var instrument = require('instrument.js');

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
    instrument: null
  },

  detached: function detached() {
    this.data.instrument = null;
  },

  methods: {
    onItemsChange: function onItemsChange() {
      this.setData({
        canvasData: this.data.canvasData
      });
      if (this.data.instrument == null || this.data.instrument == undefined) {
        this.data.instrument = new instrument(this.data.canvasData, this);
      } else {
        this.data.instrument.updateData(this.data.canvasData);
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
  }

});