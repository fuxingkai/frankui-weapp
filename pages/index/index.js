var pageObj = {
  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        id: 'date',
        title: '1，自定义日期控件',
        navigateUrl: '/pages/date/date'
      },
      {
        id: 'city',
        title: '2，自定义城市控件',
        navigateUrl: '/pages/city/city'
      },
      {
        id: 'floatTab',
        title: '3，悬浮控件',
        navigateUrl: '/pages/float_tab/float_tab'
      },
      {
        id: 'horizontal-scroll-tab',
        title: '4，横向滑动tab',
        navigateUrl: '/pages/horizontal-scroll_tab/horizontal-scroll_tab'
      },
      {
        id: 'line-chart',
        title: '5，折线区域图',
        navigateUrl: '/pages/line-chart/line-chart'
      },
      {
        id: 'column-chart',
        title: '6，柱状图',
        navigateUrl: '/pages/column-chart/column-chart'
      },
      {
        id: 'double-line-chart',
        title: '7，双折线区域图',
        navigateUrl: '/pages/double-line-chart/double-line-chart'
      },
      {
        id: 'line-column-chart',
        title: '8，折线柱状双图',
        navigateUrl: '/pages/line-column-chart/line-column-chart'
      },
      {
        id: 'double-column-chart',
        title: '9，双柱状双图',
        navigateUrl: '/pages/double-column-chart/double-column-chart'
      }, {
        id: 'calibration-instrument',
        title: '10，刻度盘',
        navigateUrl: '/pages/calibration-instrument/calibration-instrument'
      }, {
        id: 'progress-bar',
        title: '11，进度条',
        navigateUrl: '/pages/progress-bar/progress-bar'
      }, {
        id: 'cycle-select',
        title: '12，日，周，月，季度，自定义周期选择器',
        navigateUrl: '/pages/call-statistics/call-statistics'
      }, {
        id: 'cycle-select',
        title: '13，通用list分页加载，加载更多组件和音频播放结合使用demo',
        navigateUrl: '/pages/call-statistics-detail/call-statistics-detail?startDate=2018-11-11&endDate=2018-11-11',
      }, {
        id: 'comon-search',
        title: '14，通用搜索',
        navigateUrl: '/pages/comon-search/comon-search?startDate=2018-11-11&endDate=2018-11-11',
      }, {
        id: 'comon-search-history',
        title: '15，通用搜索和历史搜索',
        navigateUrl: '/pages/comon-search-history/comon-search-history?startDate=2018-11-11&endDate=2018-11-11',
      }, {
        id: 'slide',
        title: '16，侧滑删除',
        navigateUrl: '/pages/slide/slide',
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

}

Page(pageObj);