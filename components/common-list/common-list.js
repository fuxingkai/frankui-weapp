"use strict";
Component({
    properties: {
        list: {
            type: Array,
            value: [],
            observer: "onListChange"
        },
        loadMore: {
            type: Object,
            value: {
                enableLoadMore: false,
                hasMore: true,
            },
            observer: "onLoadMoreChange"
        },
        
    },


    data: {
        enableLoadMore: false,
        hasMore: true,
    },


    methods: {

        onListChange: function onListChange() {
            this.setData({
                list: this.data.list,
            });
        },

        /**
         * list里面item内部点击
         * 可通过e.detail.clickEvent.target知道是Item内部哪个子控件自身点击事件
         * @param {*} e 
         */
        onClickItem: function onClickItem(e) {
            // console.log(e);
            this.triggerEvent('onClickListItem', e.detail);
        },
        
        /**
         * 加载更多控件更新
         */
        onLoadMoreChange: function onLoadMoreChange() {
            this.setData({
                enableLoadMore: this.data.loadMore.enableLoadMore,
                hasMore: this.data.loadMore.hasMore,
            });
        },

    }
});