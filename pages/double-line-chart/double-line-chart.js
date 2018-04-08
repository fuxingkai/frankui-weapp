const app = getApp();
var rate = 0;
var doubleLineCanvasWidth = 0;
var doubleLineCanvasHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doubleLineCanvasData: {
      canvasId: 'doubleLine',
    },
    doubleLineTitle: "广告统计",
    doubleLineUnit: [
      { color: "#13CE66", title: "展现量" },
      { color: "#FFA848", title: "点击率" }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.systemInfo);
    var systemInfo = app.systemInfo;
    rate = systemInfo.screenWidth / 750;
    var updateData = {};
    //双折线图配置参数
    doubleLineCanvasWidth = systemInfo.screenWidth - rate * 64;
    doubleLineCanvasHeight = rate * 304 + rate * 20 + rate * 32 + rate * 24; //轴高+内外边距+字体大小
    var doubleLineYMax = 0;
    var doubleLineYMin = 0;
    var doubleLineXMax = 0;
    var doubleLineXMin = 0;
    updateData['doubleLineCanvasData.canvasWidth'] = doubleLineCanvasWidth;
    updateData['doubleLineCanvasData.axisPadd'] = { left: rate * 10, top: rate * 20, right: rate * 10 };
    updateData['doubleLineCanvasData.axisMargin'] = { bottom: rate * 32, left: rate * 20, right: rate * 20 };
    updateData['doubleLineCanvasData.yAxis.fontSize'] = rate * 22;
    updateData['doubleLineCanvasData.yAxis.fontColor'] = '#637280';
    updateData['doubleLineCanvasData.yAxis.lineColor'] = '#DCE0E6';
    updateData['doubleLineCanvasData.yAxis.lineWidth'] = rate * 2;
    updateData['doubleLineCanvasData.yAxis.dataWidth'] = rate * 68;
    updateData['doubleLineCanvasData.yAxis.isShow'] = true;
    updateData['doubleLineCanvasData.yAxis.isDash'] = true;
    updateData['doubleLineCanvasData.yAxis.minData'] = doubleLineYMin;
    updateData['doubleLineCanvasData.yAxis.maxData'] = doubleLineYMax;
    updateData['doubleLineCanvasData.yAxis.padd'] = rate * 304 / (doubleLineYMax - doubleLineYMin);

    updateData['doubleLineCanvasData.xAxis.dataHeight'] = rate * 26;
    updateData['doubleLineCanvasData.xAxis.fontSize'] = rate * 24;
    updateData['doubleLineCanvasData.xAxis.fontColor'] = '#637280';
    updateData['doubleLineCanvasData.xAxis.lineColor'] = '#DCE0E6';
    updateData['doubleLineCanvasData.xAxis.lineWidth'] = rate * 2;
    updateData['doubleLineCanvasData.xAxis.minData'] = doubleLineXMin;
    updateData['doubleLineCanvasData.xAxis.maxData'] = doubleLineXMax;
    updateData['doubleLineCanvasData.xAxis.padd'] = (doubleLineCanvasWidth - rate * (10 + 10 + 20 + 20 + 68 + 68)) / (doubleLineXMax - doubleLineXMin); //画布宽度减去内外边距

    updateData['doubleLineCanvasData.canvasHeight'] = doubleLineCanvasHeight;
    updateData['doubleLineCanvasData.touchDetail.width'] = rate * 144;
    updateData['doubleLineCanvasData.touchDetail.height'] = rate * 149;
    updateData['doubleLineCanvasData.touchDetail.fontSize'] = rate * 20;
    updateData['doubleLineCanvasData.touchDetail.fontColor'] = '#ffffff';
    updateData['doubleLineCanvasData.touchDetail.padd'] = rate * 12;
    updateData['doubleLineCanvasData.touchDetail.bgColor'] = "#637280";
    updateData['doubleLineCanvasData.touchDetail.lineSpacingExtra'] = rate * 12;


    let doubleLineRightYAxisData = [];
    let doubleLineRightYMax = 0;
    let doubleLineRightYMin = 0;
    let lineDoubleRatio = 1;

    let doubleLineSeries = {
      data: [{
        data: [
          { x: 0, y: 100, title: "4月4日|展现量10000|点击量:1000|点击率:10%" },
          { x: 1, y: 230, title: "4月5日|展现量:10000|点击量:1000|点击率:10%" },
          { x: 2, y: 430, title: "4月6日|展现量:10000|点击量:1000|点击率:10%" },
          { x: 3, y: 530, title: "4月7日|展现量:10000|点击量:1000|点击率:10%" },
          { x: 4, y: 630, title: "4月8日|展现量:10000|点击量:1000|点击率:10%" },
          { x: 5, y: 730, title: "4月9日|展现量:10000|点击量:1000|点击率:10%" },
          { x: 6, y: 830, title: "4月10日|展现量:10000|点击量:1000|点击率:10%" }
        ],
        lineColor: "#13CE66",
        point: {
          size: rate * 5,
          bColor: '#13CE66',
          sClor: '#ffffff',
          isShow: true
        }
      }, {
        data: [
          { x: 0, y: 90, title: "" },
          { x: 1, y: 130, title: "" },
          { x: 2, y: 430, title: "" },
          { x: 3, y: 530, title: "" },
          { x: 4, y: 130, title: "" },
          { x: 5, y: 130, title: "" },
          { x: 6, y: 830, title: "" }
        ],
        lineColor: "#FFA848",
        point: {
          size: rate * 5,
          bColor: '#FFA848',
          sClor: '#ffffff',
          isShow: true
        }
      }]
    };
    let doubleLineXAxisData = [
      { x: 0, y: 0, title: "04.4" },
      { x: 1, y: 0, title: "04.5" },
      { x: 2, y: 0, title: "04.6" },
      { x: 3, y: 0, title: "04.7" },
      { x: 4, y: 0, title: "04.8" },
      { x: 5, y: 0, title: "04.9" },
      { x: 6, y: 0, title: "04.10" }
    ];
    let doubleLineYAxisData = [];
    doubleLineYMax = 1000;
    doubleLineXMax = 6;
    doubleLineYMax = this.getYMax(doubleLineYMax);
    doubleLineYAxisData = this.getYAxiss(doubleLineYMax);

    doubleLineRightYMax = this.getYMax(6.0 * 100);
    lineDoubleRatio = doubleLineYMax / doubleLineRightYMax;
    doubleLineRightYAxisData = this.getRightYAxiss(doubleLineRightYMax, lineDoubleRatio);

    updateData['doubleLineCanvasData.xAxis.minData'] = doubleLineXMin;
    updateData['doubleLineCanvasData.xAxis.maxData'] = doubleLineXMax;
    updateData['doubleLineCanvasData.xAxis.padd'] = (doubleLineCanvasWidth - rate * (10 + 10 + 20 + 20 + 68 + 68)) / (doubleLineXMax - doubleLineXMin); //画布宽度减去内外边距
    updateData['doubleLineCanvasData.yAxis.minData'] = doubleLineYMin;
    updateData['doubleLineCanvasData.yAxis.maxData'] = doubleLineYMax;
    updateData['doubleLineCanvasData.yAxis.padd'] = rate * 304 / (doubleLineYMax - doubleLineYMin);
    updateData['doubleLineCanvasData.series'] = doubleLineSeries;
    updateData['doubleLineCanvasData.xAxis.data'] = doubleLineXAxisData;
    updateData['doubleLineCanvasData.yAxis.data'] = doubleLineYAxisData;
    updateData['doubleLineCanvasData.yAxis.rightData'] = doubleLineRightYAxisData;

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



  /**
      * 获得y轴最大值
      * @param  {[type]} yMax 当前最大值
      * @return {[type]}      [description]
      */
  getYMax: function (yMax) {
    let maxInt = Math.floor(yMax);
    let maxLength = maxInt.toString().length;
    let interval = 0;
    if (maxInt == 0) {
      interval = 3 * Math.pow(10, 1);
    } else {
      if (maxLength > 3) {
        interval = 3 * Math.pow(10, maxLength - 2);
      } else {
        interval = 3 * Math.pow(10, maxLength - 1);
      }
    }

    let remainder = maxInt % interval;
    let conversionMax = ((maxInt - remainder) / interval + 1) * interval;
    return conversionMax;
  },

  /**
   * 获得y轴数组
   * @param  {[type]} yMax y轴最大值
   * @return {[type]}      [description]
   */
  getYAxiss: function (yMax) {
    let yAxisData = [];

    let avg = yMax / 3;

    let point = {};
    point.x = 0;
    point.y = 0;
    point.title = '0'
    yAxisData.push(point);

    let point1 = {};
    point1.x = 0;
    point1.y = Math.floor(avg);
    point1.title = Math.floor(avg);
    yAxisData.push(point1);

    let point2 = {};
    point2.x = 0;
    point2.y = Math.floor(avg) * 2;;
    point2.title = Math.floor(avg) * 2;
    yAxisData.push(point2);

    let point3 = {};
    point3.x = 0;
    point3.y = Math.floor(avg) * 3;
    point3.title = Math.floor(avg) * 3;
    yAxisData.push(point3);
    return yAxisData;
  },

  /**
   * 获得y轴数组
   * @param  {[type]} yMax y轴最大值
   * @return {[type]}      [description]
   */
  getRightYAxiss: function (yMax, ratio) {
    let yAxisData = [];

    let avg = yMax / 3;

    let point = {};
    point.x = 0;
    point.y = 0 * ratio;
    point.title = '0'
    yAxisData.push(point);

    let point1 = {};
    point1.x = 0;
    point1.y = Math.floor(avg) * ratio;
    point1.title = Math.floor(avg) / 100 + "%";
    yAxisData.push(point1);

    let point2 = {};
    point2.x = 0;
    point2.y = Math.floor(avg) * 2 * ratio;;
    point2.title = Math.floor(avg) * 2 / 100 + "%";
    yAxisData.push(point2);

    let point3 = {};
    point3.x = 0;
    point3.y = Math.floor(avg) * 3 * ratio;
    point3.title = Math.floor(avg) * 3 / 100 + "%";
    yAxisData.push(point3);
    return yAxisData;
  }
})