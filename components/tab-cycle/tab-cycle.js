"use strict";

Component({
    properties: {
        tab_datas: {
            type: Array,
            value:[
                { id: "day", title: "日", isSelect: true },
                { id: "weeks", title: "周", isSelect: false },
                { id: "month", title: "月", isSelect: false },
                { id: "quarter", title: "季度", isSelect: false },
                { id: "custom", title: "自定义", isSelect: false }
            ],
            observer: "onItemsChange"
        },
        cur_tab_id: {
            type: String,
            value: "",
            observer: 'onSelectIndexChange'
        }
    },


    data: {
        defaut_tab_datas: [
            { id: "day", title: "日", isSelect: true },
            { id: "weeks", title: "周", isSelect: false },
            { id: "month", title: "月", isSelect: false },
            { id: "quarter", title: "季度", isSelect: false },
            { id: "custom", title: "自定义", isSelect: false }
        ]
    },

 
    methods: {
        onTabItemClick: function onTabItemClick(e) {
            var id = e.currentTarget.dataset.tabs.id;
            this.updateData(id);
            this.triggerEvent('tabclick', { id: e.currentTarget.dataset.tabs.id });
        },
        onSelectIndexChange: function onSelectIndexChange() {
            var id = this.data.cur_tab_id;
            this.updateData(id);
        },
        updateData: function updateData(id) {
            for (var i = 0; i < this.data.tab_datas.length; i++) {
                if (id == this.data.tab_datas[i].id) {
                    this.data.tab_datas[i].isSelect = true;
                    this.data.cur_tab_id = this.data.tab_datas[i].id;
                } else {
                    this.data.tab_datas[i].isSelect = false;
                }
            }
            this.onItemsChange();
        },
        onItemsChange: function onItemsChange() {
            this.setData({
                tab_datas: this.data.tab_datas == null || this.data.tab_datas.length == 0 ? this.data.defaut_tab_datas : this.data.tab_datas
            });
        }
    }
});