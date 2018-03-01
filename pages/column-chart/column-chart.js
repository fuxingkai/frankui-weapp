const app = getApp();
var rate = 0;
var canvasWidth = 0;
var canvasHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columnCanvasData: {
      canvasId: 'columnCanvas',
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

    var culumnYMax = 60;
    var culumnYMin = 0;
    updateData['columnCanvasData.canvasWidth'] = canvasWidth;
    updateData['columnCanvasData.axisPadd'] = { left: rate * 5, top: rate * 13, right: rate * 5 };
    updateData['columnCanvasData.axisMargin'] = { bottom: rate * 34, left: rate * 26 };
    updateData['columnCanvasData.yAxis.fontSize'] = rate * 22;
    updateData['columnCanvasData.yAxis.fontColor'] = '#637280';
    updateData['columnCanvasData.yAxis.lineColor'] = '#DCE0E6';
    updateData['columnCanvasData.yAxis.lineWidth'] = rate * 2;
    updateData['columnCanvasData.yAxis.dataWidth'] = rate * 62;
    updateData['columnCanvasData.yAxis.isShow'] = true;
    updateData['columnCanvasData.yAxis.isDash'] = true;
    updateData['columnCanvasData.yAxis.minData'] = culumnYMin;
    updateData['columnCanvasData.yAxis.maxData'] = culumnYMax;
    updateData['columnCanvasData.yAxis.padd'] = rate * 306 / (culumnYMax - culumnYMin);

    updateData['columnCanvasData.xAxis.dataHeight'] = rate * 26;
    updateData['columnCanvasData.xAxis.fontSize'] = rate * 22;
    updateData['columnCanvasData.xAxis.fontColor'] = '#637280';
    updateData['columnCanvasData.xAxis.lineColor'] = '#DCE0E6';
    updateData['columnCanvasData.xAxis.lineWidth'] = rate * 2;
    updateData['columnCanvasData.xAxis.padd'] = rate * 52;
    updateData['columnCanvasData.xAxis.dataWidth'] = rate * 64;
    updateData['columnCanvasData.xAxis.leftOffset'] = rate * 40;


    updateData['columnCanvasData.canvasHeight'] = canvasHeight;
    updateData['columnCanvasData.enableScroll'] = true;

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
    var updateData = {};

    var columnYMax = 60;
    var columnYMin = 0;

    updateData['columnCanvasData.yAxis.minData'] = columnYMin;
    updateData['columnCanvasData.yAxis.maxData'] = columnYMax;
    updateData['columnCanvasData.series'] = [{
      data: [32, 16, 5, 55, 43, 26, 22, 32, 22],
    }];
    updateData['columnCanvasData.xAxis.data'] = ['搜索类', '社交类', '咨询类', '视频类', '门户类', 'D类', 'A类', 'B类', 'C类'];
    updateData['columnCanvasData.yAxis.data'] = [
      { x: 0, y: 0, title: '0' },
      { x: 0, y: 20, title: '20' },
      { x: 0, y: 40, title: '40' },
      { x: 0, y: 60, title: '60' }
    ];

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
    console.log("122222");
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


  onTouchHandler(e) {
    if (null == this.column_chart) {
      this.column_chart = this.selectComponent("#column-chart");
    }
    this.column_chart.onTouchHandler(e);
  },
  onTouchMoveHandler(e) {
    if (null == this.column_chart) {
      this.column_chart = this.selectComponent("#column-chart");
    }
    this.column_chart.onTouchMoveHandler(e);
  },
  onTouchEndHandler(e) {
    if (null == this.column_chart) {
      this.ccolumn_chart = this.selectComponent("#column-chart");
    }
    this.column_chart.onTouchEndHandler(e);
  },


})