// pages/horizontal-scroll_tab/horizontal-scroll_tab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ips: [
      { id: "1", title: "全部", isSelect:true },
      { id: "2", title: "养老", isSelect: false},
      { id: "3", title: "儿童", isSelect: false},
      { id: "4", title: "健身", isSelect: false },
      { id: "5", title: "旅行", isSelect: false },
      { id: "6", title: "互联网", isSelect: false },
      { id: "7", title: "大数据", isSelect: false },
      { id: "8", title: "比特币", isSelect: false },
      { id: "9", title: "宅基地三权分置", isSelect: false },
    ],
    content:"全部"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
    * item点击事件
    */
  onIpItemClick: function (event) {
    console.log(event);
    var id = event.currentTarget.dataset.item.id;
    var curIndex = 0;
    for (var i = 0; i < this.data.ips.length; i++) {
      if (id == this.data.ips[i].id) {
        this.data.ips[i].isSelect = true;
        curIndex = i;
      } else {
        this.data.ips[i].isSelect = false;
      }
    }

    this.setData({
      content: this.data.ips[curIndex].title,
      ips: this.data.ips,
    });
  },

})