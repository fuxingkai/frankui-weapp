
var pageObj = {
  /**
   * 页面的初始数据
   */
  data: {
    items: [{ id: 'date', title: '自定义日期控件', navigateUrl: '/pages/date/date' }, { id: 'city', title: '自定义城市控件', navigateUrl: '/pages/city/city' }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

}

Page(pageObj);