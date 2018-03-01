const app = getApp();
var rate = 0;
var canvasWidth = 0;
var canvasHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lineCanvasData: {
      canvasId: 'lineAreaCanvas',
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
    canvasWidth = systemInfo.screenWidth - rate * 64;
    canvasHeight = rate * 306 + rate * 44 + rate * 34 + rate * 22;

    var yMax = 500;
    var yMin = 0;
    var xMax = 30;
    var xMin = 0;
    updateData['lineCanvasData.canvasWidth'] = canvasWidth;
    updateData['lineCanvasData.axisPadd'] = { left: rate * 5, top: rate * 44, right: rate * 5 };
    updateData['lineCanvasData.axisMargin'] = { bottom: rate * 34, left: rate * 26 };
    updateData['lineCanvasData.yAxis.fontSize'] = rate * 22;
    updateData['lineCanvasData.yAxis.fontColor'] = '#637280';
    updateData['lineCanvasData.yAxis.lineColor'] = '#DCE0E6';
    updateData['lineCanvasData.yAxis.lineWidth'] = rate * 2;
    updateData['lineCanvasData.yAxis.dataWidth'] = rate * 62;
    updateData['lineCanvasData.yAxis.isShow'] = true;
    updateData['lineCanvasData.yAxis.isDash'] = true;
    updateData['lineCanvasData.yAxis.minData'] = yMin;
    updateData['lineCanvasData.yAxis.maxData'] = yMax;
    updateData['lineCanvasData.yAxis.padd'] = rate * 306 / (yMax - yMin);

    updateData['lineCanvasData.xAxis.dataHeight'] = rate * 26;
    updateData['lineCanvasData.xAxis.fontSize'] = rate * 22;
    updateData['lineCanvasData.xAxis.fontColor'] = '#637280';
    updateData['lineCanvasData.xAxis.lineColor'] = '#DCE0E6';
    updateData['lineCanvasData.xAxis.lineWidth'] = rate * 2;
    updateData['lineCanvasData.xAxis.minData'] = xMin;
    updateData['lineCanvasData.xAxis.maxData'] = xMax;
    updateData['lineCanvasData.xAxis.padd'] = (canvasWidth - rate * 103) / (xMax - xMin);

    updateData['lineCanvasData.point'] = { size: rate * 4, isShow: false };
    updateData['lineCanvasData.canvasHeight'] = canvasHeight;

 
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
    canvasWidth = systemInfo.screenWidth - rate * 64;
    canvasHeight = rate * 306 + rate * 44 + rate * 34 + rate * 22;

    var yMax = 500;
    var yMin = 0;
    var xMax = 30;
    var xMin = 0;
    var series = [{
      data: [
        { x: 0, y: 111, title: '111' },
        { x: 2, y: 60, title: '60' },
        { x: 4, y: 450, title: '200', isShowLine: true },
        { x: 5, y: 111, title: '111', isShowLine: true },
        { x: 6, y: 260, title: '260' }
      ]
    }];
    var xAxisData = [
      { x: 0, y: 0, title: '1.1' },
      { x: 1, y: 0, title: '1.2' },
      { x: 2, y: 0, title: '1.3' },
      { x: 3, y: 0, title: '1.4' },
      { x: 4, y: 0, title: '1.5' },
      { x: 5, y: 0, title: '1.6' },
      { x: 6, y: 0, title: '1.7' }
    ];
    var yAxisData = [
      { x: 0, y: 0, title: '0' },
      { x: 0, y: 150, title: '150' },
      { x: 0, y: 300, title: '300' },
      { x: 0, y: 450, title: '450' }
    ];
    yMax = 450;
    yMin = 0;
    xMax = 6;
    xMin = 0;
    updateData['lineCanvasData.xAxis.minData'] = xMin;
    updateData['lineCanvasData.xAxis.maxData'] = xMax;
    updateData['lineCanvasData.xAxis.padd'] = (canvasWidth - rate * 98) / (xMax - xMin);
    updateData['lineCanvasData.point'] = { size: rate * 4, isShow: true };
    updateData['lineCanvasData.yAxis.minData'] = yMin;
    updateData['lineCanvasData.yAxis.maxData'] = yMax;
    updateData['lineCanvasData.yAxis.padd'] = rate * 306 / (yMax - yMin);
    updateData['lineCanvasData.series'] = series;
    updateData['lineCanvasData.xAxis.data'] = xAxisData;
    updateData['lineCanvasData.yAxis.data'] = yAxisData;
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