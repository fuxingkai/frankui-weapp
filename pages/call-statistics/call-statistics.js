'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cycleId: 'month',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(opt) {

  },

  /**
   * 周期切换点击
   * @param {*} e 
   */
  onClickTabCycle: function onClickTabCycle(e) {
    console.log(e);
    this.setData({
      cycleId: e.detail.id
    })
  }

});