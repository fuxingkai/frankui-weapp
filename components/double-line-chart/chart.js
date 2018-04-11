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
    rightData: [],
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
    context.setFontSize(config.xAxis.fontSize);
    axis.x = leftOffset + config.xAxis.padd * (config.xAxis.data[i].x - config.xAxis.minData) - context.measureText(config.xAxis.data[i].title).width / 2;
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


  if (config.yAxis.rightData != undefined && config.yAxis.rightData != null && config.yAxis.rightData.length > 1) {
    var yRightAxis = [];
    var rightDataLength = config.yAxis.rightData.length;
    for (var i = 0; i < rightDataLength; i++) {
      let axis = {};
      axis.x = config.canvasWidth - config.yAxis.dataWidth;
      axis.y = config.yAxis.padd * (config.yAxis.maxData - config.yAxis.rightData[i].y) + padd.top + axisPadd.top + config.yAxis.fontSize / 2;
      axis.content = config.yAxis.rightData[i].title;
      yRightAxis.push(axis);
    }

    context.beginPath();
    context.setFontSize(config.yAxis.fontSize);
    context.setFillStyle(config.yAxis.fontColor);
    yRightAxis.forEach(function (item) {
      let metricsContent = context.measureText(item.content).width;
      let rigthX = item.x + config.yAxis.dataWidth - metricsContent;
      context.fillText(item.content, rigthX, item.y);
    });
    context.closePath();
  }
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

  var lines = [];
  var distance = 0;
  var realTouch = {};

  series.data.forEach(function (items, indexs) {
    let areaDatas = [];
    items.data.forEach(function (item, index) {
      let areaData = {};
      areaData.x = leftOffset + (item.x - config.xAxis.minData) * config.xAxis.padd;
      areaData.y = topOffset + (config.yAxis.maxData - item.y) * config.yAxis.padd;
      areaData.title = item.title != null || item.title != undefined ? item.title : "";

      if (indexs == 0) {
        if (distance == 0 || Math.abs(areaData.x - config.touchDetail.x) < distance) {
          realTouch.x = areaData.x;
          realTouch.y = areaData.y;
          realTouch.title = [];
          realTouch.title = item.title.split('|');
          distance = Math.abs(areaData.x - config.touchDetail.x);
        }

      }

      areaDatas.push(areaData);
    });
    let lineItem = {};
    let lineItemPoint = {};
    lineItem.data = areaDatas;
    lineItem.linesColor = items.lineColor;

    lineItemPoint.size = items.point.size;
    lineItemPoint.bColor = items.point.bColor;
    lineItemPoint.sClor = items.point.sClor;
    lineItemPoint.isShow = items.point.isShow;

    lineItem.point = lineItemPoint;
    lines.push(lineItem);
  });


  context.save();

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
        context.arc(item.x, item.y, items.point.size, 0, 2 * Math.PI)
        context.setFillStyle(items.point.bColor)
        context.fill();
        context.beginPath();
        context.arc(item.x, item.y, items.point.size / 2, 0, 2 * Math.PI)
        context.setFillStyle(items.point.sClor)
        context.fill();
      });
    }
  });


  if (config.touchDetail.isShow) {

    context.beginPath();
    context.setFillStyle(config.touchDetail.bgColor);
    if ((realTouch.x + config.touchDetail.padd * 2 + config.touchDetail.width) < (leftOffset + yAxisWidth)) {
      context.fillRect(realTouch.x + config.touchDetail.padd * 2, topOffset - axisPadd.top, config.touchDetail.width, config.touchDetail.height);
    } else {
      context.fillRect(realTouch.x - config.touchDetail.padd * 2 - config.touchDetail.width, topOffset - axisPadd.top, config.touchDetail.width, config.touchDetail.height);
    }
    context.closePath();


    context.beginPath();
    if ((realTouch.x + config.touchDetail.padd * 2 + config.touchDetail.width) < (leftOffset + yAxisWidth)) {
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
  drawXYAxisGrid(opts, config, context);
  drawXAxis(opts, config, context);
  drawArea(series, opts, config, context);
  drawYAxis(opts, config, context);
  drawCanvas(opts, context);
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
  var axisEndX = (_that.config.xAxis.maxData - _that.config.xAxis.minData) * _that.config.xAxis.padd + _that.config.padd.left + _that.config.axisMargin.left + _that.config.yAxis.dataWidth + _that.config.axisPadd.right + _that.config.axisMargin.right;
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

module.exports = Charts;