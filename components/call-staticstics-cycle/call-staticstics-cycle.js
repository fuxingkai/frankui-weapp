"use strict";

Component({
    properties: {
        data: {
            type: Object,
            value: {
            },
            observer: "onDataChange"
        },
        dateType: {
            type: String,
            value: '',
        },
    },


    data: {
        dateType:""
    },


    methods: {
        onDataChange: function onDataChange() {
            this.setData({
                data: this.data.data,
            });
        },

        /**
         * 日期选择回调
         * @param {*} e 
         */
        onCallbackDate: function onCallbackDate(e) {
            console.log(e);
        },

    }
});