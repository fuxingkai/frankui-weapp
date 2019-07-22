// pages/about/about.js
Page({
  data: {
    cts: [{
        "acticleLink": "https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/init.html",
        "count": 12,
        "createTime": "2019-07-10T04:09:18.479Z",
        "des": "真牛逼,修改描述",
        "look": 33,
        miniAppPath: "",
        noReadCount: 0,
        title: "第一条长标题留言区,修改标题1",
        wxPublicName: "牛掰",
        _id: "13dba11c5d2564ee046f12b64be034b6",
      }, {
        "acticleLink": "https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/init.html",
        "count": 12,
        "createTime": "2019-07-10T04:09:18.479Z",
        "des": "真牛逼,修改描述",
        "look": 33,
        miniAppPath: "",
        noReadCount: 0,
        title: "第二条长标题留言区,修改标题1",
        wxPublicName: "牛掰",
        _id: "13dba11c5d2564ee046f12b64be034b6",
      }, {
        "acticleLink": "https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/init.html",
        "count": 12,
        "createTime": "2019-07-10T04:09:18.479Z",
        "des": "真牛逼,修改描述",
        "look": 33,
        miniAppPath: "",
        noReadCount: 0,
        title: "第三条长标题留言区,修改标题1",
        wxPublicName: "牛掰",
        _id: "13dba11c5d2564ee046f12b64be034b6",
      }

    ],
    loadMore: {
      enableLoadMore: false,
      hasMore: true,
    },
    noReadTotal: 0
  },

  onLoad: function() {},

  onShow: function() {
    let updateData = {};
    let _this = this;

  },

  onClickMoreListItem: function(e) {
    console.log("onClickMoreListItem", e);
    let updateData = {};
    let _this = this;
    switch (e.detail.clickEvent.target) {
      case 'item':
        {
          console.log("onClickMoreListItem", "item");
          wx.showToast({
            title: 'item',
            icon: 'none'
          })
          break;
        }
      case 'delete':
        {
          console.log("onClickMoreListItem", "delete");
          wx.showToast({
            title: 'delete',
            icon: 'none'
          })
          break;
        }
      case 'edit':
        {
          console.log("onClickMoreListItem", "edit");
          wx.showToast({
            title: 'edit',
            icon: 'none'
          })
          break;
        }
      default:
        {
          break
        }
    }
  },

  onClickCreateCT: function(e) {
    wx.navigateTo({
      url: '/pages/add-ct/add-ct',
    })
  },

  onShareAppMessage: function(res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      let jp = {
        ctId: res.target.dataset.item._id,
      }

      let path = "pages/ct/ct?jp=" + encodeURIComponent(JSON.stringify(jp));

      return {
        title: '[邀请留言]' + res.target.dataset.item.title,
        path: path,
        imageUrl: '/images/icon_share_default_bg.png'
      }
    }

  }
})