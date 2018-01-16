var rate = 0; //分辨转换
var floatTop = 0; //悬浮高度
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: "news", isSelect: true, title: "要闻" },
      { id: "hall", isSelect: false, title: "供需" }
    ], //tabbar数组
    curTabId: "news", //当前tabid
    isShowFloatTab: false //是否显示悬浮tab
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScrollTop();
  },

  /**
   * 获得滑动导致悬浮开始的高度
   * @return {[type]} [description]
   */
  getScrollTop: function () {
    var that = this;
    if (wx.canIUse('getSystemInfo.success.screenWidth')) {
      wx: wx.getSystemInfo({
        success: function (res) {
          rate = res.screenWidth / 750;
          floatTop = 104 * rate;
          that.setData({
            scrollTop: 104 * res.screenWidth / 750,
            scrollHeight: res.screenHeight / (res.screenWidth / 750) - 128,
          });
        }
      });
    }
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onPageScroll: function (event) {
    var scrollTop = event.scrollTop;
    if (scrollTop >= floatTop && !this.data.isShowFloatTab) {
      this.setData({
        isShowFloatTab: true,
      });
    } else if (scrollTop < floatTop && this.data.isShowFloatTab) {
      this.setData({
        isShowFloatTab: false,
      });
    }
  },


  /**
     * 点击tab切换
     * @param  {[type]} event 
     * @return {[type]}       
     */
  clickTab: function (event) {
    var id = event.detail.id;
    this.data.curTabId = id;
    for (var i = 0; i < this.data.tabs.length; i++) {
      if (id == this.data.tabs[i].id) {
        this.data.tabs[i].isSelect = true;
      } else {
        this.data.tabs[i].isSelect = false;
      }
    }

    this.setData({
      tabs: this.data.tabs,
      curTabId: this.data.curTabId,
    });

    //更新数据，第一次点击或者为空的时候加载重新加载数据
    if (this.data.curTabId == 'news') {
    } else {
    }
  },


})