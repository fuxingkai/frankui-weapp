Component({
  options: {
    multipleSlots: true
  },
  properties: {
    //  组件显示区域的宽度 (rpx)
    width: {
      type: Number,
      value: 750 // 750rpx 即整屏宽
    },
    //  组件显示区域的高度 (rpx),必填项
    height: {
      type: Number,
      value: 0
    },
    //  组件滑动显示区域的宽度 (rpx)
    slideWidth: {
      type: Number,
      value: 0
    },
    // 是否允许惯性越界
    out: {
      type: Boolean,
      value: true
    },
    
  },

  data: {
    x:0,
  },

  ready() {
    const info = wx.getSystemInfoSync()
    let rate = info.screenWidth / 750;
    let params = {}
    const query = wx.createSelectorQuery().in(this)
    query
      .select('.slideslip-right')
      .boundingClientRect(res => {
        this.setData({
          slideWidth: res.width / rate
        });
      })
      .exec()
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.setData({
        x: 0,
      });
     },

  },
  methods: {
    
    bindchange(e) {
      // if (this.data.x==0){
      //   this.setData({
      //     x: 1,
      //   });
      // }
    }
  }
})