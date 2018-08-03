'use strict';

/**
 * 绘制刻度盘
 */
function drawInstrument(opts, context) {
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
  context.beginPath();
  context.arc(opts.width / 2, opts.height - opts.bottomHeight, opts.needleHeight - opts.margin, Math.PI, 2*Math.PI);
  context.setFillStyle(opts.bigArcBgColor);
  context.fill();

  context.beginPath();
  context.arc(opts.width / 2, opts.height - opts.bottomHeight, opts.needleHeight - opts.padd - opts.margin, Math.PI, 2 * Math.PI);
  context.setFillStyle(opts.smallArcBgColor);
  context.fill();

  context.beginPath();
  context.setLineWidth(opts.bottomHeight);
  context.moveTo(0, opts.height - opts.bottomHeight / 2);
  context.lineTo(opts.margin + opts.padd, opts.height - opts.bottomHeight / 2);
  context.setStrokeStyle(opts.bigArcBgColor);
  context.stroke();

  context.beginPath();
  context.setLineWidth(opts.bottomHeight);
  context.moveTo(opts.width, opts.height - opts.bottomHeight / 2);
  context.lineTo(opts.width - opts.margin - opts.padd, opts.height - opts.bottomHeight / 2);
  context.setStrokeStyle(opts.bigArcBgColor);
  context.stroke();
  
  for (let i = 0;i<41;i++){
    let lineWidth = opts.needleWidth / 8;
    let intervalScale =2 * Math.PI / 360*4.5
    let lineHeight = lineHeight = opts.needleHeight - opts.margin - 5;
    if (i % 5 == 0 && i != 0 && i != 40){
      lineWidth = opts.needleWidth / 4;
      if (i % 10 == 0) {
        lineHeight = opts.needleHeight - opts.padd - opts.margin;
      }else{
        lineHeight = opts.needleHeight - opts.margin -10;
      }
    } 
    context.beginPath();
    context.setLineWidth(lineWidth);
    context.moveTo(opts.width / 2 - lineHeight * Math.cos(intervalScale * i), opts.height - lineHeight * Math.sin(intervalScale * i) - opts.bottomHeight - lineWidth / 2);
    context.lineTo(opts.width / 2 - (opts.needleHeight - opts.margin) * Math.cos(intervalScale * i), opts.height - (opts.needleHeight - opts.margin) * Math.sin(intervalScale * i) - opts.bottomHeight - lineWidth / 2);
    context.setStrokeStyle(opts.instrumentColor);
    context.stroke();
  }
  for (let i = 0; i < 5; i++) {
    let scaleFontSize = 14;
    let intervalScale = 2 * Math.PI / 360 * 45
    let text = opts.instrument * i;
    let lineHeight = opts.needleHeight - opts.padd - opts.margin-5;
    context.beginPath();
    context.setFontSize(scaleFontSize);
    context.setFillStyle(opts.instrumentFontColor);
    const metrics = context.measureText(text);
    if (i < 2){
      context.fillText(text, opts.width / 2 - lineHeight * Math.cos(intervalScale * i), opts.height - lineHeight * Math.sin(intervalScale * i));
    } else if (i == 2){
      context.fillText(text, opts.width / 2 - lineHeight * Math.cos(intervalScale * i) - metrics.width / 2, opts.height - lineHeight * Math.sin(intervalScale * i) + scaleFontSize/2);
    }else{
      context.fillText(text, opts.width / 2 - lineHeight * Math.cos(intervalScale * i) - metrics.width, opts.height - lineHeight * Math.sin(intervalScale * i));
    }

    context.closePath();
  }


  context.beginPath();
  context.arc(opts.width / 2, opts.height - opts.needleArcRadius, opts.needleArcRadius, 0, 2 * Math.PI);
  context.setFillStyle(opts.needleColor);
  context.fill();  

  context.beginPath();
  context.setLineWidth(opts.needleWidth);
  context.moveTo(opts.width / 2, opts.height - opts.needleArcRadius);
  context.lineTo(opts.width / 2 - opts.needleHeight * Math.cos(opts.radian), opts.height - opts.needleHeight * Math.sin(opts.radian) - opts.bottomHeight - opts.needleWidth/2);
  context.setStrokeStyle(opts.needleColor);
  context.stroke();
}

function drawCanvas(opts, context) {
  context.draw();
}


function drawCharts(opts, context) {
  drawInstrument(opts,context);
  drawCanvas(opts, context);
}


var Charts = function Charts(opts, _that) {
  this.opts = opts;
  this.context = wx.createCanvasContext(opts.canvasId, _that);
  drawCharts.call(this,  this.opts, this.context);
};

Charts.prototype.updateData = function (opts) {
  this.opts = opts;
  drawCharts.call(this, this.opts, this.context);
};

module.exports = Charts;