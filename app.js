//app.js
App({
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var _that = this;
    wx: wx.getSystemInfo({
      success: function (res) {
        _that.systemInfo = res;
      }
    });
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },


  /**
   * 系统信息
   */
  systemInfo: null,//系统信息


  /**
   * 音频播放上下文
   */
  audioContext: null,

  /**
   * 获取当前音频上下文
   */
  getAudioContext: function getAudioContext() {
    if (this.audioContext == null) {
      this.audioContext = wx.createInnerAudioContext();
    }
    return this.audioContext;
  },

  /**
   * 摧毁当前音频上下文
   */
  destroyAudioContext: function destroyAudioContext() {
    if (this.audioContext != null) {
      this.audioContext.stop();
      this.audioContext.destroy
    }
  },
})