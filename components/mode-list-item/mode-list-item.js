'use strict';

Component({
    properties: {
        item: {
            type: Object,
            value: null,
            observer: 'onDataChange'
        },
        index: {
            type: Number,
            value: "",
        }
    },

    data: {
        curTime: '00:00',
        sliderValue: ''
    },

    methods: {
        onDataChange: function onDataChange() {
            this.setData({
                item: this.data.item,
            });
        },
        /**
         * 点击播放
         * @param {*} e 
         */
        onClickPlay: function onClickPlay(e) {
            let data = e.currentTarget.dataset.item;
            data.index = this.data.index;
            let clickEvent = {};
            clickEvent.target = 'play';
            data.clickEvent = clickEvent;
            this.triggerEvent('onClickItem', data);
        },
       
    }
});