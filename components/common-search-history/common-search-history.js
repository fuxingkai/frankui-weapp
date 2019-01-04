"use strict";
Component({
    properties: {
        list: {
            type: Array,
            value: [],
            observer: "onListChange"
        },        
    },


    data: {
    },


    methods: {

        onListChange: function onListChange() {
            this.setData({
                list: this.data.list,
            });
        },

        /**
         * 点击Item
         * @param {*} e 
         */
        onClickItem: function onClickItem(e) {
            let data = e.currentTarget.dataset.item;
            this.triggerEvent('onClickItem', data);
        },


        /**
         * 点击清除历史
         * @param {*} e 
         */
        onClickClear: function onClickClear(e) {
            this.triggerEvent('onClickClearHistory', {});
        },
        

    }
});