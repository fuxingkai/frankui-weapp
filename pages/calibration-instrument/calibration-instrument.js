const app = getApp();
var rate = 0;
var canvasWidth = 0;
var canvasHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    instrumentData: {
      canvasId: 'instrument',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.systemInfo);
    var systemInfo = app.systemInfo;
    rate = systemInfo.screenWidth / 750;
    var updateData = {};
  // opts.instrument = 30;//刻度文本的最小单位
  // opts.width= 200;//整个画布宽度
  // opts.height= 105;//整个画布高度
  // opts.margin= 7.5;//刻度盘凸出部分
  // opts.padd = 40;//圆环的大小
  // opts.bigArcBgColor = '#0077FF';//大半圆背景
  // opts.smallArcBgColor = '#ffffff';//小半圆背景
  // opts.instrumentFontColor = '#000000';//刻度字体颜色
  // opts.instrumentColor = "#ffffff";//刻度针的颜色
  // opts.bottomHeight = 5;//needleArcRadius-needleWidth/2
  // opts.needleWidth = 5;//(needleArcRadius-bottomHeight)*2
  // opts.needleHeight = 100;//针的长度
  // opts.needleColor = '#FF3366';//针的颜色
  // opts.needleArcRadius= 7.5;//针对应的圆bottomHeight+needleWidth/2
  // opts.radian = 2*Math.PI / 360*167;
    updateData['instrumentData.canvasWidth'] = 200;
    updateData['instrumentData.canvasHeight'] = 105;
    updateData['instrumentData.width'] = 200;//整个画布宽度
    updateData['instrumentData.height'] = 105;//整个画布高度
    updateData['instrumentData.instrument'] = 30;//刻度文本的最小单位
    updateData['instrumentData.margin'] = 7.5;//刻度盘凸出部分
    updateData['instrumentData.padd'] = 40;//圆环的大小
    updateData['instrumentData.bigArcBgColor'] = '#0077FF';//大半圆背景
    updateData['instrumentData.smallArcBgColor'] = '#ffffff';//小半圆背景
    updateData['instrumentData.instrumentFontColor'] = '#000000';//刻度字体颜色
    updateData['instrumentData.instrumentColor'] = '#ffffff';//刻度针的颜色
    updateData['instrumentData.bottomHeight'] = 5;//needleArcRadius-needleWidth/2
    updateData['instrumentData.needleWidth'] = 5;//(needleArcRadius-bottomHeight)*2
    updateData['instrumentData.needleHeight'] = 100;//针的长度
    updateData['instrumentData.needleColor'] = '#FF3366';//针的颜色
    updateData['instrumentData.needleArcRadius'] = 7.5;//针对应的圆bottomHeight+needleWidth/2
    updateData['instrumentData.radian'] = 2 * Math.PI / 360 * 167;
    this.setData(updateData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var systemInfo = app.systemInfo;
    rate = systemInfo.screenWidth / 750;
    var updateData = {};
    this.setData(updateData);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("22222");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },




})