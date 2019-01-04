"use strict";
Component({
    properties: {
        historyKey: {
            type: String,
            value: '',
            observer: "onHistoryKeyChange"
        },
    },


    data: {
        historyList: [],
        isHiddenHistory:false
    },


    methods: {

        onHistoryKeyChange: function onHistoryKeyChange() {
            this.setData({
                historyKey: this.data.historyKey,
            });
            let _this = this;
            wx.getStorage({
                key: this.data.historyKey,
                success(res) {
                    if(res.data!=undefined&&res.data!=null&&res.data.length>0){
                        let historyList = JSON.parse(res.data);
                        _this.setData({
                            historyList:historyList
                        });
                    }
                }
              })
        },

        
        /**
         * 输入内容变化
         * @param {*} e 
         */
        onSearchInputChange: function onSearchInputChange(e) {
            this.setData({
                isHiddenHistory:e.detail.content.length>0?true:false
            });
        },

        /**
         * 点击搜索
         * @param {*} e 
         */
        onClickSearchSubmit: function onClickSearchSubmit(e) {
            if (e.detail.content == '') {
                return;
            }
            let isAddToHistoryList = true;
            this.data.historyList.forEach(function (value, index) {
                if(e.detail.content==value){
                    isAddToHistoryList = false;
                }
            });
            if(isAddToHistoryList){
                this.data.historyList.push(e.detail.content);
                this.setData({
                    historyList: this.data.historyList.slice(0, 5),
                });
                wx.setStorage({
                    key: this.data.historyKey,
                    data: JSON.stringify(this.data.historyList.slice(0, 5))
                });
            }
            this.triggerEvent('onClickSubmit', { content: e.detail.content});
        },

        /**
         * 点击搜索历史item
         * @param {*} e 
         */
        onClickHistoryItem: function onClickHistoryItem(e) {
            this.setData({
                isHiddenHistory: true,
            });
            this.triggerEvent('onClickSubmit', { content: e.detail});
        },

        /**
         * 点击清空历史搜索
         * @param {*} e 
         */
        onClickClearHistory: function onClickClearHistory(e) {
            this.setData({
                historyList: [],
            });
            wx.setStorage({
                key: this.data.historyKey,
                data: JSON.stringify([])
            });
        },



    }
});