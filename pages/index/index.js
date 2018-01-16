
var pageObj = {
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 'date', title: '1，自定义日期控件', navigateUrl: '/pages/date/date' }, 
      { id: 'city', title: '2，自定义城市控件', navigateUrl: '/pages/city/city' },
      { id: 'floatTab', title: '3，悬浮控件', navigateUrl: '/pages/float_tab/float_tab' }
      ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

}

Page(pageObj);