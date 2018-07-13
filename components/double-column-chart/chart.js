'use strict';

var config = {
  //画布内边距
  padd: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  //坐标轴的外边距
  axisMargin: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  //坐标轴内边距
  axisPadd: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  point: {
    size: 0,
    bColor: '#0077FF',
    sClor: '#ffffff',
    isShow: true
  },
  //x轴的数据
  xAxis: {
    data: [],
    isShow: true, //是否显示
    padd: 50, //间隔
    dataWidth: 32, //数据宽度，用于柱状图
    dataHeight: 17, //数据展示的高度
    fontSize: 12, //数据的字体大小
    leftOffset: 0,
    fontColor: '#637280', //数据的字体颜色
    lineWidth: 1, //线条宽高
    lineDash: {
      pattern: [3, 3],
      offset: 0
    }, //虚线的时候对应的数据
    lineColor: "#DCE0E6", //线条的颜色
    isDash: true //是否是虚线
  },
  //y轴的数据注释同上
  yAxis: {
    data: [
      // { x: 0, y: 0, title: '' }
    ],
    rightData: [],
    isShow: true,
    minData: 0, //区块最小值
    maxData: 60, //区块的最大值
    dataWidth: 36, //数据展示的宽度
    fontSize: 12,
    fontColor: '#637280',
    padd: 50,
    lineWidth: 1,
    lineDash: {
      pattern: [3, 3],
      offset: 0
    },
    lineColor: "#DCE0E6",
    isDash: false
  },
  canvasWidth: 0, //画布宽度
  canvasHeight: 0, //画布高度
  touchDetail: {
    isShow: false,
    x: 0,
    y: 0,
    padd: 0,
    width: 0,
    height: 0,
    bgColor: "",
    fontColor: "",
    fontSize: 12,
    lineSpacingExtra: 0,
  }
};

var util = {};
(function () {

  var arr = [];

  var getProto = Object.getPrototypeOf;

  var slice = arr.slice;

  var concat = arr.concat;

  var push = arr.push;

  var indexOf = arr.indexOf;

  var class2type = {};

  var toString = class2type.toString;

  var hasOwn = class2type.hasOwnProperty;

  var fnToString = hasOwn.toString;

  var ObjectFunctionString = fnToString.call(Object);

  var support = {};


  util = {

    isPlainObject: function (obj) {
      var proto, Ctor;

      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }

      proto = getProto(obj);

      if (!proto) {
        return true;
      }

      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },

    isEmptyObject: function (obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },

    isFunction: function (obj) {
      return typeof obj === "function" && typeof obj.nodeType !== "number";
    },

    isArray: function () {
      return Array.isArray.apply(null, arguments);
    },

    extend: function () {

      var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

      if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
      }

      if (typeof target !== "object" && !this.isFunction(target)) {
        target = {};
      }

      if (i === length) {
        target = this;
        i--;
      }

      for (; i < length; i++) {

        if ((options = arguments[i]) != null) {

          for (name in options) {
            src = target[name];
            copy = options[name];

            if (target === copy) {
              continue;
            }

            if (deep && copy && (this.isPlainObject(copy) ||
              (copyIsArray = this.isArray(copy)))) {

              if (copyIsArray) {
                copyIsArray = false;
                clone = src && this.isArray(src) ? src : [];

              } else {
                clone = src && this.isPlainObject(src) ? src : {};
              }

              target[name] = this.extend(deep, clone, copy);

            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }

      return target;
    }

  };
}());

/**
 * 绘制xy网格
 */
function drawXYAxisGrid(opts, config, context) {
  var padd = config.padd;
  var axisMargin = config.axisMargin;
  var axisPadd = config.axisPadd;
  var leftOffset = padd.left + axisMargin.left + axisPadd.left + config.yAxis.dataWidth;
  var topOffset = padd.top + axisMargin.top + axisPadd.top;

  context.save();

  //滚动网格
  // context.translate(opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true ? opts._scrollDistance_ : 0, 0);

  //是否绘制y网格
  if (config.yAxis.isShow) {
    drawYAxisGrid(leftOffset, topOffset, config, context)
  }
  context.restore();
}


/**
 * 绘制y轴网格
 */
function drawYAxisGrid(leftOffset, topOffset, config, context) {
  //y轴网格线数据
  if (config.yAxis.data == null || config.yAxis.data.length < 1) {
    return;
  }
  var yGridLines = [];
  for (var i = 0; i < config.yAxis.data.length; i++) {
    let line = [];
    let startPoint = {};
    startPoint.x = 0 + leftOffset;
    startPoint.y = config.yAxis.padd * (config.yAxis.maxData - config.yAxis.data[i].y) + topOffset;
    line.startPoint = startPoint;
    let endPoint = {};
    if (config.yAxis.rightData != undefined && config.yAxis.rightData != null && config.yAxis.rightData.length > 1) {
      endPoint.x = config.canvasWidth - config.padd.right - config.axisMargin.right - config.axisPadd.right - config.yAxis.dataWidth;
    } else {
      endPoint.x = config.canvasWidth - config.padd.right - config.axisMargin.right - config.axisPadd.right;
    }
    endPoint.y = config.yAxis.padd * (config.yAxis.maxData - config.yAxis.data[i].y) + topOffset;
    line.endPoint = endPoint;
    yGridLines.push(line);
  }

  context.beginPath();
  context.setStrokeStyle(config.yAxis.lineColor);
  context.setLineWidth(config.yAxis.lineWidth);
  context.moveTo(yGridLines[0].startPoint.x, yGridLines[0].startPoint.y);
  context.lineTo(yGridLines[0].endPoint.x, yGridLines[0].endPoint.y);
  context.closePath();
  context.stroke();

  context.beginPath();
  context.setStrokeStyle(config.yAxis.lineColor);
  context.setLineWidth(config.yAxis.lineWidth);
  if (config.yAxis.isDash) {
    context.setLineDash(config.yAxis.lineDash.pattern, config.yAxis.lineDash.offset);
  }
  yGridLines.forEach(function (item, index) {
    context.moveTo(item.startPoint.x, item.startPoint.y);
    context.lineTo(item.endPoint.x, item.endPoint.y);
  });
  context.stroke();
  context.closePath();
}

//绘制x轴
function drawXAxis(opts, config, context) {
  var padd = config.padd;
  var axisMargin = config.axisMargin;
  var axisPadd = config.axisPadd;
  var leftOffset = padd.left + axisMargin.left + axisPadd.left + config.yAxis.dataWidth + config.xAxis.leftOffset;;
  var topOffset = padd.top + axisPadd.top + axisPadd.bottom + axisMargin.bottom + axisMargin.top + config.xAxis.dataHeight / 2;

  var xAxis = [];
  var dataLength = config.xAxis.data.length;
  for (var i = 0; i < dataLength; i++) {
    let axis = {};
    axis.x = leftOffset + (config.xAxis.padd + config.xAxis.dataWidth) * i - measureText(config.xAxis.data[i].title, config.xAxis.fontSize) / 2 + config.xAxis.dataWidth / 2;

    axis.y = (config.yAxis.maxData - config.yAxis.minData) * config.yAxis.padd + topOffset;
    axis.content = config.xAxis.data[i].title;
    xAxis.push(axis);
  }

  context.save();

  context.translate(opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true ? opts._scrollDistance_ : 0, 0);

  context.beginPath();
  context.setFontSize(config.xAxis.fontSize);
  context.setFillStyle(config.xAxis.fontColor);
  xAxis.forEach(function (item) {
    context.fillText(item.content, item.x, item.y);
  });
  context.closePath();
  context.restore();
}

function measureText(text, fontSize) {
  text = String(text);
  var text = text.split('');
  var width = 0;
  text.forEach(function (item) {
    if (/[a-zA-Z]/.test(item)) {
      width += 7;
    } else if (/[0-9]/.test(item)) {
      width += 5.5;
    } else if (/\./.test(item)) {
      width += 2.7;
    } else if (/-/.test(item)) {
      width += 3.25;
    } else if (/[\u4e00-\u9fa5]/.test(item)) {
      width += 10;
    } else if (/\(|\)/.test(item)) {
      width += 3.73;
    } else if (/\s/.test(item)) {
      width += 2.5;
    } else if (/%/.test(item)) {
      width += 8;
    } else {
      width += 10;
    }
  });
  return width * fontSize / 10 + 3;
}

//绘制y轴
function drawYAxis(opts, config, context) {
  var padd = config.padd;
  var axisMargin = config.axisMargin;
  var yAxisWidth = padd.left + config.yAxis.dataWidth + axisMargin.left;
  var yAxisHeight = config.canvasHeight;
  context.save();
  context.beginPath();
  const grd = context.createLinearGradient(0, 0, yAxisWidth, yAxisHeight);
  grd.addColorStop(0, '#FFFFFF')
  grd.addColorStop(1, '#FFFFFF')
  // Fill with gradient
  context.setFillStyle(grd)
  context.fillRect(0, 0, yAxisWidth, yAxisHeight);
  context.closePath();

  var yAxis = [];
  var dataLength = config.yAxis.data.length;
  for (var i = 0; i < dataLength; i++) {
    let axis = {};
    axis.x = padd.left;
    axis.y = config.yAxis.padd * (config.yAxis.maxData - config.yAxis.data[i].y) + padd.top + axisMargin.top + config.axisPadd.top + config.yAxis.fontSize / 2;
    axis.content = config.yAxis.data[i].title;
    yAxis.push(axis);
  }

  context.beginPath();
  context.setFontSize(config.yAxis.fontSize);
  context.setFillStyle(config.yAxis.fontColor);
  yAxis.forEach(function (item) {
    context.fillText(item.content, item.x, item.y);
  });
  context.closePath();

  if (config.yAxis.rightData != undefined && config.yAxis.rightData != null && config.yAxis.rightData.length > 1) {
    var yRightAxis = [];
    var rightDataLength = config.yAxis.rightData.length;
    for (var i = 0; i < rightDataLength; i++) {
      let axis = {};
      axis.x = config.canvasWidth - config.yAxis.dataWidth;
      axis.y = config.yAxis.padd * (config.yAxis.maxData - config.yAxis.rightData[i].y) + padd.top + axisMargin.top + config.axisPadd.top + config.yAxis.fontSize / 2;
      axis.content = config.yAxis.rightData[i].title;
      yRightAxis.push(axis);
    }

    context.beginPath();
    context.setFontSize(config.yAxis.fontSize);
    context.setFillStyle(config.yAxis.fontColor);
    yRightAxis.forEach(function (item) {
      let metricsContent = measureText(item.content, config.yAxis.fontSize);
      let rigthX = item.x + config.yAxis.dataWidth - metricsContent;
      context.fillText(item.content, rigthX, item.y);
    });
    context.closePath();
  }

  context.restore();
}


/**
 * 绘制数据区域
 */
function drawColumn(series, opts, config, context) {
  if (series == null || series == undefined || series.cloumnData == null || series.cloumnData.data == null) {
    return;
  }
  var padd = config.padd;
  var axisMargin = config.axisMargin;
  var axisPadd = config.axisPadd;
  var leftOffset = padd.left + axisMargin.left + axisPadd.left + config.yAxis.dataWidth + config.xAxis.leftOffset;
  var topOffset = padd.top + axisMargin.top + axisPadd.top;

  var yAxisHeight = (config.yAxis.maxData - config.yAxis.minData) * config.yAxis.padd;
  var yAxisMaxPoint = config.canvasWidth - padd.right - axisPadd.right;

  var distance = 0;
  var realTouch = {};

  var columnsData = [];

  var areaDatas = [];
  var columnColor = {};
  columnColor.startColor = series.cloumnData.columnStartColor;
  columnColor.endColor = series.cloumnData.columnEndColor;
  series.cloumnData.data.forEach(function (item, index) {
    let areaData = {};
    areaData.x = leftOffset + index * (config.xAxis.padd + config.xAxis.dataWidth);
    areaData.y = topOffset + yAxisHeight - (item.y - config.yAxis.minData) * config.yAxis.padd;
    areaDatas.push(areaData);

    if (distance == 0 || Math.abs(areaData.x - config.touchDetail.x) < distance) {
      realTouch.x = areaData.x + config.xAxis.dataWidth / 2;
      realTouch.y = areaData.y;
      realTouch.title = [];
      realTouch.title = item.title.split('|');
      distance = Math.abs(areaData.x - config.touchDetail.x);
    }

    if (undefined != item.axis && item.axis != null) {
      let columnSize = item.axis.length;
      let columns = {};
      let columnAreas = [];
      item.axis.forEach(function (item1, index1) {
        let columnArea = {};
        columnArea.x = leftOffset + index * (config.xAxis.padd + config.xAxis.dataWidth) + index1 * config.xAxis.dataWidth / columnSize;
        columnArea.y = topOffset + yAxisHeight - (item1.y - config.yAxis.minData) * config.yAxis.padd;
        columnArea.startColor = item1.columnStartColor;
        columnArea.endColor = item1.columnEndColor;
        columnAreas.push(columnArea);
      });
      columns.columnAreas = columnAreas;
      columnsData.push(columns);
    }
  });


  context.save();

  //原点坐标
  var startPoint = {};
  startPoint.x = leftOffset;
  startPoint.y = topOffset + yAxisHeight;

  if (columnsData.length < 1) {
    //单柱状图
    context.beginPath();
    areaDatas.forEach(function (item) {
      let grd = context.createLinearGradient(item.x, item.y, item.x, startPoint.y)
      grd.addColorStop(1, columnColor.startColor);
      grd.addColorStop(0, columnColor.endColor);

      // Fill with gradient
      context.setFillStyle(grd)
      context.fillRect(item.x, item.y, config.xAxis.dataWidth, startPoint.y - item.y)
    });
    context.closePath();
  } else {
    //多柱状图
    columnsData.forEach(function (item) {
      let columnSize = item.columnAreas.length;
      item.columnAreas.forEach(function (item1) {
        context.beginPath();
        let grd = context.createLinearGradient(item1.x, item1.y, item1.x, startPoint.y)
        grd.addColorStop(1, item1.startColor);
        grd.addColorStop(0, item1.endColor);

        // Fill with gradient
        context.setFillStyle(grd)
        context.fillRect(item1.x, item1.y, config.xAxis.dataWidth / columnSize, startPoint.y - item1.y)
        context.closePath();
      });
    });
  }


  if (series.lineData != null && series.lineData != undefined) {
    var lines = [];
    series.lineData.forEach(function (items, indexs) {
      let lineDatas = [];
      items.data.forEach(function (item, index) {
        let lineData = {};
        lineData.x = leftOffset + index * (config.xAxis.padd + config.xAxis.dataWidth) + config.xAxis.dataWidth / 2;
        lineData.y = topOffset + yAxisHeight - (item.y - config.yAxis.minData) * config.yAxis.padd;
        lineDatas.push(lineData);
      });
      let lineItem = {};
      let lineItemPoint = {};
      lineItem.data = lineDatas;
      lineItem.linesColor = items.lineColor;

      lineItemPoint.size = items.point.size;
      lineItemPoint.bColor = items.point.bColor;
      lineItemPoint.sClor = items.point.sClor;
      lineItemPoint.isShow = items.point.isShow;

      lineItem.point = lineItemPoint;
      lines.push(lineItem);
    });

    //绘制折线  
    lines.forEach(function (items, index) {
      context.beginPath();
      context.setStrokeStyle(items.linesColor)
      items.data.forEach(function (item, index) {
        if (index == 0) {
          context.moveTo(item.x, item.y);
        } else {
          context.lineTo(item.x, item.y);
        }

        if (item.isShowLine) {
          context.lineTo(item.x, topOffset + yAxisHeight);
          context.moveTo(item.x, item.y);
        }
      });
      context.stroke();

      //绘制数据连接点样式
      if (items.point.isShow) {
        items.data.forEach(function (item) {
          context.beginPath();
          let bgrd = context.createLinearGradient(0, 0, 1, 1);
          bgrd.addColorStop(0, items.point.bColor)
          bgrd.addColorStop(1, items.point.bColor)
          context.setFillStyle(bgrd);
          context.arc(item.x, item.y, items.point.size, 0, 2 * Math.PI)
          context.fill();

          context.beginPath();
          let sgrd = context.createLinearGradient(0, 0, 1, 1);
          sgrd.addColorStop(0, items.point.sClor)
          sgrd.addColorStop(1, items.point.sClor)
          context.setFillStyle(sgrd)
          context.arc(item.x, item.y, items.point.size / 2, 0, 2 * Math.PI)
          context.fill();
        });
      }
    });

  }


  if (config.touchDetail.isShow) {

    context.beginPath();
    let bgColorGrd = context.createLinearGradient(0, 0, 1, 1);
    bgColorGrd.addColorStop(0, config.touchDetail.bgColor)
    bgColorGrd.addColorStop(1, config.touchDetail.bgColor)
    context.setFillStyle(bgColorGrd)
    if ((realTouch.x + config.touchDetail.padd * 2 + config.touchDetail.width) < yAxisMaxPoint) {
      context.fillRect(realTouch.x + config.touchDetail.padd * 2, topOffset - axisPadd.top, config.touchDetail.width, config.touchDetail.height);
    } else {
      context.fillRect(realTouch.x - config.touchDetail.padd * 2 - config.touchDetail.width, topOffset - axisPadd.top, config.touchDetail.width, config.touchDetail.height);
    }
    context.closePath();


    context.beginPath();
    if ((realTouch.x + config.touchDetail.padd * 2 + config.touchDetail.width) < yAxisMaxPoint) {
      context.setFontSize(config.touchDetail.fontSize);
      context.setFillStyle(config.touchDetail.fontColor);
      realTouch.title.forEach(function (item, index) {
        context.fillText(item, realTouch.x + config.touchDetail.padd * 3, topOffset - axisPadd.top + config.touchDetail.padd + config.touchDetail.lineSpacingExtra * index + config.touchDetail.fontSize * (index + 1));
      });
    } else {
      context.setFontSize(config.touchDetail.fontSize);
      context.setFillStyle(config.touchDetail.fontColor);
      realTouch.title.forEach(function (item, index) {
        context.fillText(item, realTouch.x - config.touchDetail.padd - config.touchDetail.width, topOffset - axisPadd.top + config.touchDetail.padd + config.touchDetail.lineSpacingExtra * index + config.touchDetail.fontSize * (index + 1));
      });
    }

    context.closePath();


    context.beginPath();
    context.setStrokeStyle(config.yAxis.lineColor);
    context.setLineWidth(config.yAxis.lineWidth);
    if (config.yAxis.isDash) {
      context.setLineDash(config.yAxis.lineDash.pattern, config.yAxis.lineDash.offset);
    }
    context.moveTo(realTouch.x, topOffset - axisPadd.top);
    context.lineTo(realTouch.x, topOffset + yAxisHeight);
    context.stroke();
    context.closePath();


  }


  context.restore();

}

function drawCanvas(opts, context) {
  context.draw();
}

var Timing = {
  easeIn: function easeIn(pos) {
    return Math.pow(pos, 3);
  },

  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },

  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },

  linear: function linear(pos) {
    return pos;
  }
};

function Animation(opts) {
  this.isStop = false;
  opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
  opts.timing = opts.timing || 'linear';

  var delay = 17;

  var createAnimationFrame = function createAnimationFrame() {
    if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame;
    } else if (typeof setTimeout !== 'undefined') {
      return function (step, delay) {
        setTimeout(function () {
          var timeStamp = +new Date();
          step(timeStamp);
        }, delay);
      };
    } else {
      return function (step) {
        step(null);
      };
    }
  };
  var animationFrame = createAnimationFrame();
  var startTimeStamp = null;
  var _step = function step(timestamp) {
    if (timestamp === null || this.isStop === true) {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
      return;
    }
    if (startTimeStamp === null) {
      startTimeStamp = timestamp;
    }
    if (timestamp - startTimeStamp < opts.duration) {
      var process = (timestamp - startTimeStamp) / opts.duration;
      var timingFunction = Timing[opts.timing];
      process = timingFunction(process);
      opts.onProcess && opts.onProcess(process);
      animationFrame(_step, delay);
    } else {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
    }
  };
  _step = _step.bind(this);

  animationFrame(_step, delay);
}

Animation.prototype.stop = function () {
  this.isStop = true;
};

function drawCharts(type, opts, config, context) {
  var _this = this;

  var series = opts.series;

  var duration = opts.animation ? 1000 : 0;
  this.animationInstance && this.animationInstance.stop();
  this.animationInstance = new Animation({
    timing: 'easeIn',
    duration: duration,
    onProcess: function onProcess(process) {
      drawXYAxisGrid(opts, config, context);
      drawXAxis(opts, config, context);
      drawColumn(series, opts, config, context);
      drawYAxis(opts, config, context);
      drawCanvas(opts, context);
    },
    onAnimationFinish: function onAnimationFinish() {
      _this.event.trigger('renderComplete');
    }
  });
}

function Event() {
  this.events = {};
}

Event.prototype.addEventListener = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Event.prototype.trigger = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var type = args[0];
  var params = args.slice(1);
  if (!!this.events[type]) {
    this.events[type].forEach(function (listener) {
      try {
        listener.apply(null, params);
      } catch (e) {
        console.error(e);
      }
    });
  }
};

var Charts = function Charts(opts, _that) {
  this.opts = opts;
  this.config = util.extend(true, config, opts);
  this.context = wx.createCanvasContext(opts.canvasId, _that);
  this.event = new Event();
  this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0
  };

  drawCharts.call(this, this.config.type, this.opts, this.config, this.context);
};

Charts.prototype.updateData = function (opts) {
  this.opts = util.extend(true, {}, this.opts, opts);
  this.config = util.extend(true, {}, this.config, opts);
  this.config.xAxis.data = opts.xAxis != undefined && opts.xAxis != null && opts.xAxis.data != null && opts.xAxis.data != undefined ? opts.xAxis.data : this.config.xAxis.data;
  this.config.yAxis.data = opts.yAxis != undefined && opts.yAxis != null && opts.yAxis.data != undefined && opts.yAxis.data != null ? opts.yAxis.data : this.config.yAxis.data;
  this.config.yAxis.rightData = opts.yAxis != undefined && opts.rightData != null && opts.yAxis.rightData != undefined && opts.yAxis.rightData != null ? opts.yAxis.rightData : this.config.yAxis.rightData;

  this.config.series = opts.series != undefined && opts.series != null ? opts.series : this.config.series;
  this.opts.series = opts.series != undefined && opts.series != null ? opts.series : this.opts.series;

  this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0
  };
  this.opts._scrollDistance_ = 0;

  drawCharts.call(this, this.config.type, this.opts, this.config, this.context);
};

Charts.prototype.stopAnimation = function () {
  this.animationInstance && this.animationInstance.stop();
};

Charts.prototype.addEventListener = function (type, listener) {
  this.event.addEventListener(type, listener);
};

// Charts.prototype.scrollStart = function(e) {
//     if (e.touches[0] && this.opts.enableScroll === true) {
//         this.scrollOption.startTouchX = e.touches[0].x;
//     }
// };

// Charts.prototype.scroll = function(e) {
//     if (e.touches[0] && this.opts.enableScroll === true) {
//         var _distance = e.touches[0].x - this.scrollOption.startTouchX;
//         var currentOffset = this.scrollOption.currentOffset;

//         var validDistance = calValidDistance(_distance, currentOffset, this.config);

//         this.scrollOption.distance = _distance = validDistance - currentOffset;

//         var opts = util.extend(true, this.opts, {
//             _scrollDistance_: validDistance,
//             animation: false
//         });

//         drawCharts.call(this, this.config.type, opts, this.config, this.context);
//     }
// };


Charts.prototype.touchstart = function (e) {
  if (!isInAxis(this, e.touches[0].x, e.touches[0].y)) {
    return;
  }
  this.config.touchDetail.isShow = true;
  this.config.touchDetail.x = e.touches[0].x;
  this.config.touchDetail.y = e.touches[0].y;
  drawCharts.call(this, this.config.type, this.opts, this.config, this.context);
};

Charts.prototype.touchmove = function (e) {
  if (!isInAxis(this, e.touches[0].x, e.touches[0].y)) {
    return;
  }
  var direction = getDirection(this.config.touchDetail.x, this.config.touchDetail.y, e.touches[0].x, e.touches[0].y);
  switch (direction) {
    case 0:
      //未滑动
      break;
    case 1:
      //向上
      break;
    case 2:
      //向下
      break;
    case 3:
    //向左
    case 4:
      //向右
      if (Math.abs(e.touches[0].x - this.config.touchDetail.x) > this.config.xAxis.padd / 2) {
        this.config.touchDetail.isShow = true;
        this.config.touchDetail.x = e.touches[0].x;
        this.config.touchDetail.y = e.touches[0].y;
        drawCharts.call(this, this.config.type, this.opts, this.config, this.context);
      }
      break;
    default:
  }
};

/**
 * 是否在坐标轴内
 * @param  float  x x轴                   
 * @param  float  y y轴
 * @return Boolean   是否在坐标轴内
 */
function isInAxis(_that, x, y) {
  var axisStartX = _that.config.padd.left + _that.config.axisMargin.left + _that.config.yAxis.dataWidth;
  var axisEndX = _that.config.canvasWidth;
  var axisStartY = _that.config.padd.top + _that.config.axisMargin.top;
  var axisEndY = _that.config.canvasHeight - _that.config.axisMargin.bottom - _that.config.xAxis.fontSize;
  if (axisStartX <= x && x <= axisEndX && axisStartY <= y && y <= axisEndY) {
    return true;
  }
  return false;
}

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
  var angx = endx - startx;
  var angy = endy - starty;
  var result = 0;
  //如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    return result;
  }

  var angle = Math.atan2(angy, angx) * 180 / Math.PI;
  if (angle >= -135 && angle <= -45) {
    result = 1;
  } else if (angle > 45 && angle < 135) {
    result = 2;
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3;
  } else if (angle >= -45 && angle <= 45) {
    result = 4;
  }

  return result;
}

Charts.prototype.touchend = function (e) {
  this.config.touchDetail.isShow = false;
  drawCharts.call(this, this.config.type, this.opts, this.config, this.context);
};

/**
 * 计算有效的滑动距离
 */
function calValidDistance(distance, currentOffset, config) {
  var padd = config.padd;
  var axisMargin = config.axisMargin;
  var axisPadd = config.axisPadd;
  var availableWidth = config.canvasWidth; //画布真实宽度
  var offSet = padd.left + padd.right + axisMargin.left + axisMargin.right + axisPadd.left + axisPadd.right + config.yAxis.dataWidth;
  var realWidth = config.xAxis.data.length * (config.xAxis.padd + config.xAxis.dataWidth) + offSet; //需要画布的宽度

  //计算真正需要滑动的距离，如果画布宽度大于需要的宽度不给滑动。滑动距离不能超出需要画布宽度
  var validDistance = distance + currentOffset;
  if (availableWidth >= realWidth) {
    validDistance = 0;
  } else if (validDistance >= 0) {
    validDistance = 0;
  } else if (Math.abs(validDistance) >= realWidth - availableWidth) {
    validDistance = availableWidth - realWidth;
  }
  return validDistance;
}

// Charts.prototype.scrollEnd = function(e) {
//     if (this.opts.enableScroll === true) {
//         var _scrollOption = this.scrollOption,
//             currentOffset = _scrollOption.currentOffset,
//             distance = _scrollOption.distance;

//         this.scrollOption.currentOffset = currentOffset + distance;
//         this.scrollOption.distance = 0;
//     }
// };

module.exports = Charts;