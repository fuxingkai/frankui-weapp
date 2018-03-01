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
    data: [
      // { x: 0, y: 0, title: '' }
    ],
    isShow: false, //是否显示
    padd: 0, //间隔
    minData: 0, //区块最小值
    maxData: 0, //区块的最大值
    dataWidth: 0, //数据宽度，用于柱状图
    dataHeight: 0, //数据展示的高度
    fontSize: 0, //数据的字体大小
    leftOffset: 0,
    fontColor: '#637280', //数据的字体颜色
    lineWidth: 0, //线条宽高
    lineDash: {
      pattern: [3, 3],
      offset: 0
    }, //虚线的时候对应的数据
    lineColor: "#DCE0E6", //线条的颜色
    isDash: false //是否是虚线
  },
  //y轴的数据注释同上
  yAxis: {
    data: [
      // { x: 0, y: 0, title: '' }
    ],
    isShow: false,
    minData: 0, //区块最小值
    maxData: 0, //区块的最大值
    dataWidth: 0, //数据展示的宽度
    fontSize: 0,
    fontColor: '#637280',
    padd: 0,
    lineWidth: 0,
    lineDash: {
      pattern: [3, 3],
      offset: 0
    },
    lineColor: "#DCE0E6",
    isDash: false
  },
  series: [{
    data: [
      // { x: 1, y: 111, title: '111',isShowLine:false },
    ],
  }],
  width: 0, //画布宽度
  height: 0, //画布高度
  type: "area" //画布类型
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
  drawYAxisGrid(leftOffset, topOffset, config, context)
  context.restore();
}


/**
 * 绘制y轴网格
 */
function drawYAxisGrid(leftOffset, topOffset, config, context) {
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
    endPoint.x = (config.xAxis.maxData - config.xAxis.minData) * config.xAxis.padd + leftOffset;
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
  if (config.xAxis.data == null || config.xAxis.data.length < 1) {
    return;
  }

  var padd = config.padd;
  var axisMargin = config.axisMargin;
  var axisPadd = config.axisPadd;
  var leftOffset = padd.left + axisMargin.left + axisPadd.left + config.yAxis.dataWidth;

  var topOffset = padd.top + axisPadd.top + axisPadd.bottom + axisMargin.bottom + axisMargin.top + config.xAxis.dataHeight / 2;

  var xAxis = [];
  var dataLength = config.xAxis.data.length;
  for (var i = 0; i < dataLength; i++) {
    let axis = {};
    if (i == 0) {
      axis.x = leftOffset + config.xAxis.padd * (config.xAxis.data[i].x - config.xAxis.minData);
    } else if (i == dataLength - 1) {
      axis.x = leftOffset + config.xAxis.padd * (config.xAxis.data[i].x - config.xAxis.minData) - measureText(config.xAxis.data[i].title, config.xAxis.fontSize);
    } else {
      axis.x = leftOffset + config.xAxis.padd * (config.xAxis.data[i].x - config.xAxis.minData) - measureText(config.xAxis.data[i].title, config.xAxis.fontSize) / 2;
    }
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
  context.stroke();
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
  return width * fontSize / 10;
}

//绘制y轴
function drawYAxis(opts, config, context) {
  if (config.yAxis.data == null || config.yAxis.data.length < 1) {
    return;
  }
  var axisPadd = config.axisPadd;
  var padd = config.padd;
  var axisMargin = config.axisMargin;
  var yAxisWidth = padd.left + config.yAxis.dataWidth + axisMargin.left;
  var yAxisHeight = opts.height;
  context.beginPath();
  context.setFillStyle(opts.background || '#ffffff');
  context.closePath();
  context.fillRect(0, 0, yAxisWidth, yAxisHeight);

  var yAxis = [];
  var dataLength = config.yAxis.data.length;
  for (var i = 0; i < dataLength; i++) {
    let axis = {};
    axis.x = padd.left;
    axis.y = config.yAxis.padd * (config.yAxis.maxData - config.yAxis.data[i].y) + padd.top + axisPadd.top + config.yAxis.fontSize / 2;
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
  context.stroke();
}

/**
 * 绘制数据区域
 */
function drawArea(series, opts, config, context) {

  if (series == null || series.length < 1) {
    return;
  }

  var padd = config.padd;
  var axisMargin = config.axisMargin;
  var axisPadd = config.axisPadd;
  var leftOffset = padd.left + axisMargin.left + axisPadd.left + config.yAxis.dataWidth;
  var topOffset = padd.top + axisMargin.top + axisPadd.top;

  var yAxisHeight = (config.yAxis.maxData - config.yAxis.minData) * config.yAxis.padd;
  var yAxisWidth = (config.xAxis.maxData - config.xAxis.minData) * config.xAxis.padd;

  var areaDatas = [];
  var dataStartPoint = {}; //数据的启始坐标
  var dataEndPoint = {}; //数据的终点坐标
  series[0].data.forEach(function (item, index) {
    let areaData = {};
    areaData.x = leftOffset + (item.x - config.xAxis.minData) * config.xAxis.padd;
    areaData.y = topOffset + (config.yAxis.maxData - item.y) * config.yAxis.padd;
    areaData.title = item.title != null || item.title != undefined ? item.title : "";
    areaData.isShowLine = item.isShowLine != null || item.isShowLine != undefined ? item.isShowLine : false;
    if (0 == index) {
      dataStartPoint.x = leftOffset + (item.x - config.xAxis.minData) * config.xAxis.padd;
      dataStartPoint.y = topOffset + yAxisHeight;
    }
    if (series[0].data.length - 1 == index) {
      dataEndPoint.x = leftOffset + (item.x - config.xAxis.minData) * config.xAxis.padd;
      dataEndPoint.y = topOffset + yAxisHeight;
    }
    areaDatas.push(areaData);
  });

  //原点坐标
  var startPoint = {};
  startPoint.x = leftOffset;
  startPoint.y = topOffset + yAxisHeight;

  //x轴终点坐标
  var endPoint = {};
  endPoint.x = leftOffset + yAxisWidth;
  endPoint.y = topOffset + yAxisHeight;

  context.save();

  context.translate(opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true ? opts._scrollDistance_ : 0, 0);

  context.beginPath();
  context.setStrokeStyle('#0077FF')
  context.setFillStyle('#0077FF');
  //移动到数据开始点
  context.moveTo(dataStartPoint.x, dataStartPoint.y);
  //绘制数据点连接先
  areaDatas.forEach(function (item) {
    context.lineTo(item.x, item.y);
  });
  //绘制最后一条数据到终点的连接线
  context.lineTo(dataEndPoint.x, dataEndPoint.y);
  //连接并填充区域
  context.closePath();
  //设置透明度
  context.setGlobalAlpha(0.08);
  context.fill();

  context.setGlobalAlpha(1);

  //绘制折线  
  context.beginPath();
  context.setStrokeStyle('#0077FF')
  areaDatas.forEach(function (item, index) {
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

  //绘制需要高亮的数据
  areaDatas.forEach(function (item, index) {
    if (item.isShowLine) {
      //绘制竖线
      context.beginPath();
      context.setStrokeStyle('#0077FF')
      context.moveTo(item.x, item.y);
      context.lineTo(item.x, topOffset + yAxisHeight);
      context.stroke();

      // //绘制高亮显示方块和数据
      // let contenWidth = measureText(item.title, config.yAxis.fontSize);
      // let contentPoints = [];
      // let contentPoint1 = {};
      // contentPoint1.x = item.x - contenWidth / 2 - 0.6 * config.yAxis.fontSize;
      // contentPoint1.y = item.y - 2 * config.yAxis.fontSize;
      // contentPoints.push(contentPoint1);
      // let contentPoint2 = {};
      // contentPoint2.x = item.x - contenWidth / 2 - 0.6 * config.yAxis.fontSize;
      // contentPoint2.y = item.y - 0.5 * config.yAxis.fontSize;
      // contentPoints.push(contentPoint2);
      // let contentPoint3 = {};
      // contentPoint3.x = item.x - 0.25 * config.yAxis.fontSize;
      // contentPoint3.y = item.y - 0.5 * config.yAxis.fontSize;
      // contentPoints.push(contentPoint3);
      // let contentPoint4 = {};
      // contentPoint4.x = item.x
      // contentPoint4.y = item.y - 0.25 * config.yAxis.fontSize;
      // contentPoints.push(contentPoint4);
      // let contentPoint5 = {};
      // contentPoint5.x = item.x + 0.25 * config.yAxis.fontSize;
      // contentPoint5.y = item.y - 0.5 * config.yAxis.fontSize;
      // contentPoints.push(contentPoint5);
      // let contentPoint6 = {};
      // contentPoint6.x = item.x + contenWidth / 2 + 0.6 * config.yAxis.fontSize;
      // contentPoint6.y = item.y - 0.5 * config.yAxis.fontSize;
      // contentPoints.push(contentPoint6);
      // let contentPoint7 = {};
      // contentPoint7.x = item.x + contenWidth / 2 + 0.6 * config.yAxis.fontSize;
      // contentPoint7.y = item.y - 2 * config.yAxis.fontSize;
      // contentPoints.push(contentPoint7);

      // context.beginPath();
      // context.setFillStyle('#637280');
      // contentPoints.forEach(function(item1) {
      //     if (index == 0) {
      //         context.moveTo(item1.x, item1.y);
      //     } else {
      //         context.lineTo(item1.x, item1.y);
      //     }
      // });
      // context.closePath();
      // context.fill();

      // let titlePoint = {};
      // titlePoint.x = item.x - contenWidth / 2;
      // titlePoint.y = item.y - 0.9 * config.yAxis.fontSize;
      // context.beginPath();
      // context.setFontSize(config.yAxis.fontSize);
      // context.setFillStyle('#FFFFFF');
      // context.fillText(item.title, titlePoint.x, titlePoint.y);
      // context.closePath();
    }
  });

  if (config.point.isShow) {
    //绘制数据连接点样式
    areaDatas.forEach(function (item) {
      context.beginPath();
      context.arc(item.x, item.y, config.point.size, 0, 2 * Math.PI)
      context.setFillStyle(config.point.bColor)
      context.fill();
      context.beginPath();
      context.arc(item.x, item.y, config.point.size / 2, 0, 2 * Math.PI)
      context.setFillStyle(config.point.sClor)
      context.fill();
    });
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
      drawArea(series, opts, config, context);
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
  this.config = util.extend(true, {}, this.config, opts);
  this.config.xAxis.data = opts.xAxis != undefined && opts.xAxis != null && opts.xAxis.data != null && opts.xAxis.data != undefined ? opts.xAxis.data : this.config.xAxis.data;
  this.config.yAxis.data = opts.yAxis != undefined && opts.yAxis != null && opts.yAxis.data != undefined && opts.yAxis.data != null ? opts.yAxis.data : this.config.yAxis.data;

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

module.exports = Charts;