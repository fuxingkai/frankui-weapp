'use strict';

/**
 * 绘制普通的进度条
 */
function drawNormalProgressBar(opts, context) {
  opts.data = {
    "series":[
      { "title": "广州", "progress": 0.1, "bgColor": "#F8F9FA", "color": "#0077FF"},
      { "title": "湛江雷州附城", "progress": 0.2, "bgColor": "#F8F9FA", "color": "#FF3366"},
      { "title": "平顶山", "progress": 0.25, "bgColor": "#F8F9FA", "color": "#0077FF" },
      { "title": "乌鲁木齐市", "progress": 0.35, "bgColor": "#F8F9FA", "color": "#FF3366"},
      { "title": "其他", "progress": 0.1, "bgColor": "#F8F9FA", "color": "#0077FF" }
    ],
    "textColor": "#1A173B",
    "textFontSizeMax": 14,
    "textFontSizeMin": 11,
    "textMax": 5,
    "textWidth":55,
    "internalMargin":10,
    "progressMargin": 14,
    "progressHeight": 12,
    "progressWidth":220,
    "progressMax": 0.5
  };

  opts.data.series.forEach(function (item, index) {
    let titleText = "";
    if (item.title.length > opts.data.textMax){
      titleText = item.title.substr(0,4)+'...';
    }else{
      titleText = item.title;
    }
    let titleFontSize = item.title.length >= opts.data.textMax ? opts.data.textFontSizeMin : opts.data.textFontSizeMax;
    context.beginPath();
    context.setStrokeStyle(opts.data.textColor);
    context.setFontSize(titleFontSize);
    context.fillText(titleText, opts.data.internalMargin, (opts.data.progressHeight + opts.data.progressMargin) * index + opts.data.progressHeight - (opts.data.progressHeight - titleFontSize)/2);
    context.closePath();

    context.beginPath();
    context.setLineCap('round');
    context.setStrokeStyle(item.bgColor);
    context.setLineWidth(opts.data.progressHeight);
    context.moveTo(opts.data.internalMargin * 2 + opts.data.textWidth, (opts.data.progressHeight + opts.data.progressMargin) * index + opts.data.progressHeight/2);
    context.lineTo(opts.data.internalMargin * 2 + opts.data.textWidth + opts.data.progressWidth, (opts.data.progressHeight + opts.data.progressMargin) * index + opts.data.progressHeight/2);
    context.stroke();

    context.beginPath();
    context.setLineCap('round');
    context.setStrokeStyle(item.color);
    context.setLineWidth(opts.data.progressHeight);
    context.moveTo(opts.data.internalMargin * 2 + opts.data.textWidth, (opts.data.progressHeight + opts.data.progressMargin) * index + opts.data.progressHeight / 2);
    context.lineTo(opts.data.internalMargin * 2 + opts.data.textWidth + opts.data.progressWidth * item.progress / opts.data.progressMax, (opts.data.progressHeight + opts.data.progressMargin) * index + opts.data.progressHeight / 2);
    context.stroke();

    context.beginPath();
    context.setStrokeStyle(opts.data.textColor);
    context.setFontSize(opts.data.textFontSizeMax);
    context.fillText(item.progress*100+'%',opts.data.internalMargin * 3 + opts.data.textWidth + opts.data.progressWidth, (opts.data.progressHeight + opts.data.progressMargin) * index + opts.data.progressHeight);
    context.closePath();

  });
}

/**
 * 绘制普通的进度条
 */
function drawRingProgressBar(opts, context) {
  opts.data = {
    "series": [
      { "title": "IOS", "progress": 1, "bgColor": "#F8F9FA", "color": "#0077FF" },
      { "title": "Android", "progress": 0.2, "bgColor": "#F8F9FA", "color": "#FF3366" },
      { "title": "PC", "progress": 0.25, "bgColor": "#F8F9FA", "color": "#0077FF" },
    ],
    "textColor": "#0077FF",
    "textFontSize": 14,
    "progressColor": "#1A173B",
    "progressFontSize": 25,
    "margin": 10,
    "ringRadius": 48,
    "progressHeight": 12,
    "progressMax": 1
  };

  opts.data.series.forEach(function (item, index) {
    context.beginPath();
    context.setLineWidth(opts.data.progressHeight);
    context.setStrokeStyle(item.bgColor);
    context.arc((opts.data.margin + opts.data.ringRadius) * (2 * index + 1), opts.data.ringRadius, opts.data.ringRadius - opts.data.progressHeight / 2, -0.5 * Math.PI, 1.5 * Math.PI);
    context.stroke();

    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(opts.data.progressHeight);
    context.setStrokeStyle(item.color);
    context.arc((opts.data.margin + opts.data.ringRadius) * (2 * index + 1), opts.data.ringRadius, opts.data.ringRadius - opts.data.progressHeight / 2, -0.5 * Math.PI, (2 * item.progress / opts.data.progressMax -0.5) * Math.PI);
    context.stroke();
    
    let progressText = item.progress * 100 + '%';
    let metrics = context.measureText(progressText);
    context.beginPath();
    context.setFontSize(opts.data.progressFontSize);
    context.setFillStyle(opts.data.progressColor);
    context.fillText(progressText, (opts.data.margin + opts.data.ringRadius) * (2 * index + 1) - metrics.width / 2, opts.data.ringRadius + opts.data.progressFontSize/3);
    context.closePath();

    // let titleMetrics = context.measureText(item.title);
    // context.beginPath();
    // context.setFontSize(opts.data.textFontSize);
    // context.setFillStyle(opts.data.textColor);
    // context.fillText(item.title, (opts.data.margin + opts.data.ringRadius) * (2 * index + 1) - titleMetrics.width / 2, opts.data.ringRadius * 2 + opts.data.margin);
  });
}

function drawCanvas(opts, context) {
  context.draw();
}


function drawCharts(opts, context) {
  // drawNormalProgressBar(opts, context);
  drawRingProgressBar(opts, context)
  drawCanvas(opts, context);
}


var Charts = function Charts(opts, _that) {
  this.opts = opts;
  this.context = wx.createCanvasContext(opts.canvasId, _that);
  drawCharts.call(this, this.opts, this.context);
};

Charts.prototype.updateData = function(opts) {
  this.opts = opts;
  drawCharts.call(this, this.opts, this.context);
};

module.exports = Charts;