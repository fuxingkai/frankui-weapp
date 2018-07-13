
var pageObj = {
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 'date', title: '1，自定义日期控件', navigateUrl: '/pages/date/date' }, 
      { id: 'city', title: '2，自定义城市控件', navigateUrl: '/pages/city/city' },
      { id: 'floatTab', title: '3，悬浮控件', navigateUrl: '/pages/float_tab/float_tab' },
      { id: 'horizontal-scroll-tab', title: '4，横向滑动tab', navigateUrl: '/pages/horizontal-scroll_tab/horizontal-scroll_tab' },
      { id: 'line-chart', title: '5，折线区域图', navigateUrl: '/pages/line-chart/line-chart' },
      { id: 'column-chart', title: '6，柱状图', navigateUrl: '/pages/column-chart/column-chart' },
      { id: 'double-line-chart', title: '7，双折线区域图', navigateUrl: '/pages/double-line-chart/double-line-chart' },
      { id: 'line-column-chart', title: '8，折线柱状双图', navigateUrl: '/pages/line-column-chart/line-column-chart' },
      { id: 'double-column-chart', title: '9，双柱状双图', navigateUrl: '/pages/double-column-chart/double-column-chart' }
      ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

}

Page(pageObj);