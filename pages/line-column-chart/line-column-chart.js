const app = getApp();
var rate = 0;
var doubleColumnCanvasWidth = 0;
var doubleColumnCanvasHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doubleColumnCanvasData: {
      canvasId: 'doubleColumn',
    },
    doubleColumnTitle: "广告统计",
    doubleColumnUnit: [
      { color: "#13CE66", title: "展现量" },
      { color: "#FFA848", title: "点击率" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.systemInfo);
    var systemInfo = app.systemInfo;
    rate = systemInfo.screenWidth / 750;
    var updateData = {};
    doubleColumnCanvasWidth = systemInfo.screenWidth - rate * 64;
    doubleColumnCanvasHeight = rate * 304 + rate * 20 + rate * 32 + rate * 24;
    var doubleColumnYMax = 0;
    var doubleColumnYMin = 0;
    updateData['doubleColumnCanvasData.canvasWidth'] = doubleColumnCanvasWidth;
    updateData['doubleColumnCanvasData.axisPadd'] = { left: rate * 10, top: rate * 20, right: rate * 10 };
    updateData['doubleColumnCanvasData.axisMargin'] = { bottom: rate * 32, left: rate * 20, right: rate * 20 };
    updateData['doubleColumnCanvasData.yAxis.fontSize'] = rate * 22;
    updateData['doubleColumnCanvasData.yAxis.fontColor'] = '#637280';
    updateData['doubleColumnCanvasData.yAxis.lineColor'] = '#DCE0E6';
    updateData['doubleColumnCanvasData.yAxis.lineWidth'] = rate * 2;
    updateData['doubleColumnCanvasData.yAxis.dataWidth'] = rate * 62;
    updateData['doubleColumnCanvasData.yAxis.isShow'] = true;
    updateData['doubleColumnCanvasData.yAxis.isDash'] = true;
    updateData['doubleColumnCanvasData.yAxis.minData'] = doubleColumnYMin;
    updateData['doubleColumnCanvasData.yAxis.maxData'] = doubleColumnYMax;
    updateData['doubleColumnCanvasData.yAxis.padd'] = rate * 304 / (doubleColumnYMax - doubleColumnYMin);

    updateData['doubleColumnCanvasData.xAxis.dataHeight'] = rate * 26;
    updateData['doubleColumnCanvasData.xAxis.fontSize'] = rate * 22;
    updateData['doubleColumnCanvasData.xAxis.fontColor'] = '#637280';
    updateData['doubleColumnCanvasData.xAxis.lineColor'] = '#DCE0E6';
    updateData['doubleColumnCanvasData.xAxis.lineWidth'] = rate * 2;
    updateData['doubleColumnCanvasData.xAxis.padd'] = rate * 132;
    updateData['doubleColumnCanvasData.xAxis.dataWidth'] = rate * 48;
    updateData['doubleColumnCanvasData.xAxis.leftOffset'] = rate * 48;


    updateData['doubleColumnCanvasData.canvasHeight'] = doubleColumnCanvasHeight;
    updateData['doubleColumnCanvasData.enableScroll'] = false;


    updateData['doubleColumnCanvasData.point'] = { bColor: "#FFA848", sClor: "#FFFFFF", size: rate * 4, isShow: true };
    updateData['doubleColumnCanvasData.touchDetail.width'] = rate * 144;
    updateData['doubleColumnCanvasData.touchDetail.height'] = rate * 149;
    updateData['doubleColumnCanvasData.touchDetail.fontSize'] = rate * 20;
    updateData['doubleColumnCanvasData.touchDetail.fontColor'] = '#ffffff';
    updateData['doubleColumnCanvasData.touchDetail.padd'] = rate * 12;
    updateData['doubleColumnCanvasData.touchDetail.bgColor'] = "#637280";
    updateData['doubleColumnCanvasData.touchDetail.lineSpacingExtra'] = rate * 12;
    let doubleCloumnRightYAxisData = [];
    let doubleCloumnRightYMax = 0;
    let doubleCloumnRightYMin = 0;
    let doubleCloumnRatio = 1;

    let doubleColumnSeries = {
      cloumnData: {
        data: [
          { x: '搜索类', y: 100, title: "搜索类|展现量10000|点击量:1000|点击率:10%" },
          { x: '资讯类', y: 930, title: "资讯类|展现量:10000|点击量:1000|点击率:10%" },
          { x: '社交类', y: 430, title: "社交类|展现量:10000|点击量:1000|点击率:10%" },

        ],
        columnStartColor: "#2BE99F",
        columnEndColor: "#13CE66"
      },
      lineData: [{
        data: [
          { x: '搜索类', y: 100, title: "" },
          { x: '资讯类', y: 230, title: "" },
          { x: '社交类', y: 430, title: "" },
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
    let doubleColumnXAxisData = [
      { x: '搜索类', y: 0, title: "搜索类" },
      { x: '资讯类', y: 0, title: "资讯类" },
      { x: '社交类', y: 0, title: "社交类" },
    ];
    let doubleColumnYAxisData = [];
    doubleColumnYMax = 1000;
    doubleColumnYMin = 0;
    doubleColumnYMax = this.getYMax(doubleColumnYMax);
    doubleColumnYAxisData = this.getYAxiss(doubleColumnYMax);

    doubleCloumnRightYMax = this.getYMax(6.0 * 100);
    doubleCloumnRatio = doubleColumnYMax / doubleCloumnRightYMax;
    doubleCloumnRightYAxisData = this.getRightYAxiss(doubleCloumnRightYMax, doubleCloumnRatio);

    updateData['doubleColumnCanvasData.yAxis.minData'] = doubleColumnYMin;
    updateData['doubleColumnCanvasData.yAxis.maxData'] = doubleColumnYMax;
    updateData['doubleColumnCanvasData.series'] = doubleColumnSeries;
    updateData['doubleColumnCanvasData.xAxis.data'] = doubleColumnXAxisData;
    updateData['doubleColumnCanvasData.yAxis.data'] = doubleColumnYAxisData;
    updateData['doubleColumnCanvasData.yAxis.rightData'] = doubleCloumnRightYAxisData;
    updateData['doubleColumnCanvasData.yAxis.padd'] = rate * 304 / (doubleColumnYMax - doubleColumnYMin);
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