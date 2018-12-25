'use strict';

Component({
  properties: {
    item: {
      type: Object,
      // value: {
      //     isPlay:false,
      //     name:'王先生',
      //     recordSrc:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      //     phone:'13168849257',
      //     type:'安居客来电',
      //     rPersonnel:'万兴',
      //     duration:'30:22',
      //     createTime:'2019-11-11 22:22:12',
      //     curTime:'30:22',
      // }
      observer: 'onDataChange'
    },
    index: {
      type: Number,
      value: "",
    }
  },

  data: {
    curTime: '00:00',
    sliderValue: '',
    pause: false,
  },

  methods: {
    onDataChange: function onDataChange() {
      this.setData({
        item: this.data.item,
      });
    },
    /**
     * 点击播放
     * @param {*} e 
     */
    onClickPlay: function onClickPlay(e) {
      let data = e.currentTarget.dataset.item;
      if (data.isPlay) {
        getApp().getAudioContext().pause();
        this.setData({
          pause: true,
        })
      } else {
        let _this = this;
        getApp().getAudioContext().src = data.recordSrc;
        getApp().getAudioContext().loop = true;
        getApp().getAudioContext().onPlay(function () {
        });//不设置的话可能onTimeUpdate无法触发
        getApp().getAudioContext().onTimeUpdate(function () {
          _this.setData({
            sliderValue: (getApp().getAudioContext().currentTime / getApp().getAudioContext().duration) * 100,
            curTime: _this.formatTime(getApp().getAudioContext().currentTime),
          })
        })
        if (!_this.data.pause) {
          getApp().getAudioContext().stop();
        }
        _this.setData({
          pause: false,
        })
        getApp().getAudioContext().play()
      }
      data.index = this.data.index;
      let clickEvent = {};
      clickEvent.target = 'play';
      data.clickEvent = clickEvent;
      this.triggerEvent('onClickItem', data);
    },

    /**
     * 后退
     * @param {*} e 
     */
    onClickPre: function onClickPre(e) {
      let _this = this;
      let currentTime = getApp().getAudioContext().currentTime - 10;
      if (currentTime < 0) {
        currentTime = 0;
      }
      _this.setData({
        sliderValue: (currentTime / getApp().getAudioContext().duration) * 100,
        curTime: _this.formatTime(currentTime)
      })
      getApp().getAudioContext().seek(currentTime);//通过滑块控制音频进度
    },


    /**
     * 前进
     * @param {*} e 
     */
    onClickNext: function onClickNext(e) {
      let _this = this;
      let currentTime = getApp().getAudioContext().currentTime + 10;
      let duration = getApp().getAudioContext().duration;
      if (currentTime > duration) {
        currentTime = duration;
      }
      _this.setData({
        sliderValue: (currentTime / duration) * 100,
        curTime: _this.formatTime(currentTime)
      })
      getApp().getAudioContext().seek(currentTime);//通过滑块控制音频进度
    },


    /**
     * 监听slider
     */
    onRecordSliderListener: function onRecordSliderListener(e) {
      let _this = this;
      var per = e.detail.value / 100;
      var long = per * getApp().getAudioContext().duration;
      this.setData({
        curTime: _this.formatTime(long)
      })
      getApp().getAudioContext().seek(long);//通过滑块控制音频进度
    },


    /**
     * 时间秒数格式化
     * @param s 时间戳（单位：秒）
     * @returns {*} 格式化后的时分秒
     */
    formatTime: function formatTime(s) {
      var t = '';
      s = parseInt(s);
      if (s > -1) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if (hour < 10) {
          // t = '0' + hour + ":";
        } else {
          t = hour + ":";
        }

        if (min < 10) { t += "0"; }
        t += min + ":";
        if (sec < 10) { t += "0"; }
        t += sec.toFixed(0);
      }
      return t;
    }
  }
});