"use strict";

Component({
    properties: {
        tab_datas: {
            type: Array,
            value: [],
            observer: "onItemsChange"
        },

    },


    data: {
        content: '',
        searchValue:'',
    },


    methods: {
        onItemsChange: function onItemsChange() {
            this.setData({

            });
        },
        bindSearchInput: function bindSearchInput(e) {
            this.setData({
                content: e.detail.value
            })
            this.triggerEvent('onSearchInputChange', { content: e.detail.value});
        },
        onClickClear: function onClickClear(e) {
            this.setData({
                searchValue:'',
                content:''
            });
            this.triggerEvent('onSearchInputChange', { content: this.data.content});
        },    
        bindConfirmSearch: function bindConfirmSearch(e) {
            this.triggerEvent('onClickSubmit', { content: e.detail.value});
        },   
        onClickSearch: function onClickSearch(e) {
            this.triggerEvent('onClickSubmit', { content: this.data.content});
        },
    }
});