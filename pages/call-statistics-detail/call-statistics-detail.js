'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryDate: {
      startDate: "",
      endDate: ""
    },
    tabStatus: [{
        id: "all",
        title: "全部",
        isSelect: true
      },
      {
        id: "hasAnswer",
        title: "已接通",
        isSelect: false
      },
      {
        id: "hasArchive",
        title: "已归档",
        isSelect: false
      },
      {
        id: "noAnswer",
        title: "未接未回",
        isSelect: false
      }
    ],
    tabStatusId: 'all',
    onReachBottom: 0,
    recordListData: null,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(opt) {
    if (opt.startDate != undefined && opt.startDate != null && opt.endDate != undefined && opt.endDate != null) {
      let queryDate = {};
      queryDate.startDate = opt.startDate;
      queryDate.endDate = opt.endDate;
      this.setData({
        queryDate: queryDate,
        recordListData: {
          queryDate: queryDate
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload(opt) {
    getApp().destroyAudioContext(); //摧毁音频对象
  },


  /**
   * tab切换
   * @param {*} e 
   */
  onClickTabStatus: function onClickTabStatus(e) {
    this.setData({
      tabStatusId: e.detail.id
    })
  },


  /**
   * 跳转搜索
   * @param {*} e 
   */
  onToSearchClick: function onToSearchClick(e) {
    console.log('跳转搜索', this.data.queryDate);
  },


  onReachBottom: function onReachBottom() {
    console.log('onReachBottom');
    this.setData({
      onReachBottom: this.data.onReachBottom + 1
    });
  },

});